import { ApiProperty } from '@nestjs/swagger';
import { IsAlpha, IsEmail, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsAlpha()
  firstName?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsAlpha()
  lastName?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({ required: false })
  image?: string;
}
