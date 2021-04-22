import { ApiProperty } from '@nestjs/swagger';
import { IsAlpha, IsEmail, IsIn, MinLength } from 'class-validator';

import { userTypes } from '../user.constant';

export class CreateUserDto {
  @ApiProperty()
  @IsAlpha()
  firstName: string;

  @ApiProperty()
  @IsAlpha()
  lastName: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsIn(userTypes)
  type: string;

  @ApiProperty({ required: false })
  image?: string;

  @ApiProperty()
  @MinLength(8)
  password: string;
}
