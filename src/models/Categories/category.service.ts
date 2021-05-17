import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CategoryDocument } from './category.schema';
import {
  CreateCategoryDto,
  UpdateCategoryDto,
  AddSubCategoryDto,
  RemoveSubCategoryDto,
  UpdateSubCategoryDto,
} from './dto';
import { handleSuccess, handleError } from '../../common/helpers';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel('Category')
    private readonly categoryModel: Model<CategoryDocument>,
  ) {}

  async createCategory(data: CreateCategoryDto) {
    try {
      const categoryExists = await this.categoryModel.findOne({
        uniqueName: data.name.toLowerCase(),
      });
      if (categoryExists) {
        return handleError('Category already exists');
      }
      data['uniqueName'] = data.name.toLowerCase();
      const newCategory = new this.categoryModel(data);
      return handleSuccess(await newCategory.save());
    } catch (e) {
      return handleError(e.message);
    }
  }

  async updateCategory(id: string, data: UpdateCategoryDto) {
    try {
      const categoryExists = await this.categoryModel.findById(id);
      if (!categoryExists) {
        return handleError('Category not exists');
      }
      if (data.name) {
        const categoryNameExists = await this.categoryModel.findOne({
          uniqueName: data.name.toLowerCase(),
        });
        if (categoryNameExists) {
          return handleError('Category with same name already exists');
        }
        data['uniqueName'] = data.name.toLowerCase();
      }
      const updatedCategory = await this.categoryModel.findByIdAndUpdate(
        id,
        data,
        {
          new: true,
        },
      );

      return handleSuccess(updatedCategory);
    } catch (e) {
      return handleError(e.message);
    }
  }

  async getAllCategories() {
    try {
      const categories = await this.categoryModel.find();
      return handleSuccess(categories);
    } catch (e) {
      return handleError(e.message);
    }
  }

  async addSubCategory(id: string, data: AddSubCategoryDto) {
    try {
      const categoryExists = await this.categoryModel.findById(id);
      if (!categoryExists) {
        return handleError('Category not exists');
      }

      const subCategoryExists = categoryExists.subCategories.filter(
        ({ uniqueName }) => uniqueName === data.name.toLowerCase(),
      )[0];
      if (subCategoryExists) {
        return handleError('Sub Category already exists');
      }

      data['uniqueName'] = data.name.toLowerCase();

      const updatedCategory = await this.categoryModel.findByIdAndUpdate(
        id,
        { $push: { subCategories: data } },
        { new: true },
      );
      return handleSuccess(updatedCategory);
    } catch (e) {
      return handleError(e.message);
    }
  }

  async removeSubCategory(id: string, data: RemoveSubCategoryDto) {
    try {
      const categoryExists = await this.categoryModel.findById(id);
      if (!categoryExists) {
        return handleError('Category not exists');
      }
      const updatedCategory = await this.categoryModel.findByIdAndUpdate(
        id,
        { $pull: { subCategories: { _id: data.id } } },
        { new: true },
      );
      return handleSuccess(updatedCategory);
    } catch (e) {
      return handleError(e.message);
    }
  }

  async removeCategory(id: string) {
    try {
      const category = await this.categoryModel.findByIdAndDelete(id);
      if (category) {
        return handleSuccess(category);
      } else {
        return handleError('Category not exists');
      }
    } catch (e) {
      return handleError(e.message);
    }
  }

  async updateSubCategory(id: string, data: UpdateSubCategoryDto) {
    try {
      const uniqueName = data.name.toLowerCase();
      const updatedSubCategory = await this.categoryModel.findOneAndUpdate(
        { _id: id, 'subCategories._id': data.id },
        {
          $set: {
            'subCategories.$.name': data.name,
            'subCategories.$.uniqueName': uniqueName,
          },
        },
        { new: true },
      );

      return handleSuccess(updatedSubCategory);
    } catch (e) {
      return handleError(e.message);
    }
  }
}
