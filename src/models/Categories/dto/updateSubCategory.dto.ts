import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId } from 'class-validator';

export class UpdateSubCategoryDto {
  @ApiProperty()
  @IsMongoId()
  id: string;

  @ApiProperty()
  name: string;
}
