import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

export class CategoryResponseDto {
  @ApiProperty()
  subCategories: SubCategoryDto[];

  @ApiProperty()
  _id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  icon: string;

  @Exclude()
  uniqueName: string;

  @ApiProperty()
  createdAt: string;

  @ApiProperty()
  updatedAt: string;
}

class SubCategoryDto {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  name: string;
}
