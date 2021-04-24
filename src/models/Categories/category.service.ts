import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CategoryDocument } from './category.schema';
import { CreateCategoryDto } from './dto';
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
        return handleError('Category Already Exists');
      }
      data['uniqueName'] = data.name.toLowerCase();
      const newCategory = new this.categoryModel(data);
      return handleSuccess(await newCategory.save());
      //return await newCategory.save();
    } catch (e) {
      return handleError(e.message);
    }
  }
}
