import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';

import { CategoryService } from './category.service';
import { CreateCategoryDto, CategoryResponseDto } from './dto';

@ApiTags('Category')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @ApiCreatedResponse({ type: CategoryResponseDto })
  @Post()
  async createCategory(@Body() createCategory: CreateCategoryDto) {
    return await this.categoryService.createCategory(createCategory);
  }
}
