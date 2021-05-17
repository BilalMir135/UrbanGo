import {
  Body,
  Controller,
  Post,
  Param,
  Put,
  Get,
  Delete,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';

import { CategoryService } from './category.service';
import {
  CreateCategoryDto,
  CategoryResponseDto,
  UpdateCategoryDto,
  AddSubCategoryDto,
  RemoveSubCategoryDto,
  UpdateSubCategoryDto,
} from './dto';

@ApiTags('Category')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @ApiCreatedResponse({ type: CategoryResponseDto })
  @Post()
  async createCategory(@Body() createCategory: CreateCategoryDto) {
    return await this.categoryService.createCategory(createCategory);
  }

  @Put(':id')
  async updateCategory(
    @Param('id') id: string,
    @Body() updateCategory: UpdateCategoryDto,
  ) {
    return await this.categoryService.updateCategory(id, updateCategory);
  }

  @Get()
  async getCategories() {
    return this.categoryService.getAllCategories();
  }

  @Put('addSubCategory/:id')
  async addSubCategory(
    @Param('id') id: string,
    @Body() addSubCategory: AddSubCategoryDto,
  ) {
    return this.categoryService.addSubCategory(id, addSubCategory);
  }

  @Put('removeSubCategory/:id')
  async removeSubCategory(
    @Param('id') id: string,
    @Body() removeSubCategory: RemoveSubCategoryDto,
  ) {
    return this.categoryService.removeSubCategory(id, removeSubCategory);
  }

  @Put('updateSubCategory/:id')
  async updateSubCategory(
    @Param('id') id: string,
    @Body() updateSubCategory: UpdateSubCategoryDto,
  ) {
    return this.categoryService.updateSubCategory(id, updateSubCategory);
  }

  @Delete(':id')
  async removeCategory(@Param('id') id: string) {
    return this.categoryService.removeCategory(id);
  }
}
