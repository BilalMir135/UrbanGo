import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as jwt from 'jsonwebtoken';

import { CreateUserDto, UpdateUserDto, LoginUserDto } from './dto';
import { UserDocument } from './user.schema';
import {
  handleSuccess,
  handleError,
  hashingPass,
  verifyPass,
} from '../../common/helpers';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserDocument>,
  ) {}

  async createUser(data: CreateUserDto) {
    try {
      const userExists = await this.userModel.findOne({ email: data.email });
      if (userExists) {
        return handleError('User already exists');
      }
      data.password = await hashingPass(data.password);
      const newUser = new this.userModel(data);
      return handleSuccess(await newUser.save());
    } catch (e) {
      return handleError(e.message);
    }
  }

  async updateUser(id: string, data: UpdateUserDto) {
    try {
      const userExist = await this.userModel.findById(id);
      if (!userExist) {
        return handleError('User not exists');
      }
      const user = await this.userModel.findByIdAndUpdate(id, data, {
        new: true,
      });
      return handleSuccess(user);
    } catch (e) {
      return handleError(e.message);
    }
  }

  async getAllUsers() {
    try {
      const users = await this.userModel.find();
      return handleSuccess(users);
    } catch (e) {
      return handleError(e.message);
    }
  }

  async deleteUser(id: string) {
    try {
      const user = await this.userModel.findByIdAndDelete(id);
      if (user) {
        return handleSuccess(user);
      } else {
        return handleError('User not exists');
      }
    } catch (e) {
      return handleError(e.message);
    }
  }

  async loginUser(loginUser: LoginUserDto) {
    try {
      const { email, password } = loginUser;
      const user = await this.userModel.findOne({ email });
      if (!user) {
        return handleError('User not exists');
      }

      const verified = await verifyPass(password, user.password);
      if (!verified) {
        return handleError('Invalid credentials');
      } else {
        const token = jwt.sign({ id: user._id }, process.env.SECRET, {
          expiresIn: process.env.EXPIRE,
        });
        return handleSuccess({ token });
      }
    } catch (e) {
      return handleError(e.message);
    }
  }
}
