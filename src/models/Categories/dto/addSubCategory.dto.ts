import { ApiProperty } from '@nestjs/swagger';

export class AddSubCategoryDto {
  @ApiProperty()
  name: string;
}
