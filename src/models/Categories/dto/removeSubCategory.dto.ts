import { ApiProperty } from '@nestjs/swagger';

export class RemoveSubCategoryDto {
  @ApiProperty()
  id: string;
}
