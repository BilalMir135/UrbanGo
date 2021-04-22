import {
  Body,
  Controller,
  Param,
  Post,
  Put,
  Get,
  Delete,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiBadRequestResponse,
  ApiTags,
} from '@nestjs/swagger';

import { UserService } from './user.service';
import { CreateUserDto, UserResponseDto, UpdateUserDto } from './dto';

@ApiTags('Users')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiCreatedResponse({ type: UserResponseDto })
  @ApiBadRequestResponse({ description: 'Invalid Values' })
  @Post()
  async createUser(@Body() createUser: CreateUserDto) {
    return await this.userService.createUser(createUser);
  }

  @ApiOkResponse({ type: UserResponseDto })
  @ApiBadRequestResponse({ description: 'Invalid Values' })
  @Put(':id')
  async updateUser(@Param('id') id: string, @Body() updateUser: UpdateUserDto) {
    return await this.userService.updateUser(id, updateUser);
  }

  @ApiOkResponse({ type: UserResponseDto, isArray: true })
  @Get()
  async getAllUsers() {
    return await this.userService.getAllUsers();
  }

  //@ApiOkResponse({ type: UserResponseDto, isArray: true })
  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return await this.userService.deleteUser(id);
  }
}
