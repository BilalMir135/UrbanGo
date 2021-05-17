import { ApiProperty } from '@nestjs/swagger';

export class UpdateCategoryDto {
  @ApiProperty({ required: false })
  name: string;

  @ApiProperty({ required: false })
  icon: string;
}
