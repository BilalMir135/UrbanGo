import {
  Body,
  Controller,
  Param,
  Post,
  Put,
  Get,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiBadRequestResponse,
  ApiTags,
  ApiBearerAuth,
} from '@nestjs/swagger';

import { UserService } from './user.service';
import {
  CreateUserDto,
  UserResponseDto,
  UpdateUserDto,
  LoginUserDto,
  LoginResponseDto,
} from './dto';
import { AuthGuard } from '../../common/guards/auth.guard';

@ApiTags('Users')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiCreatedResponse({ type: UserResponseDto })
  @ApiBadRequestResponse({ description: 'Invalid Values' })
  @Post()
  async createUser(@Body() createUser: CreateUserDto) {
    return await this.userService.createUser(createUser);
  }

  @ApiOkResponse({ type: UserResponseDto })
  @ApiBadRequestResponse({ description: 'Invalid Values' })
  @ApiBearerAuth()
  @UseGuards(new AuthGuard('user'))
  @Put()
  async updateUser(@Req() req: any, @Body() updateUser: UpdateUserDto) {
    const id = req.user.id;
    return await this.userService.updateUser(id, updateUser);
  }

  @ApiOkResponse({ type: UserResponseDto, isArray: true })
  @Get()
  async getAllUsers() {
    return await this.userService.getAllUsers();
  }

  @ApiOkResponse({ type: UserResponseDto })
  @ApiBadRequestResponse({ description: 'Invalid User' })
  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return await this.userService.deleteUser(id);
  }

  @ApiOkResponse({ type: LoginResponseDto })
  @ApiBadRequestResponse({ description: 'Invalid Credentials' })
  @Post('/login')
  async loginUser(@Body() loginUser: LoginUserDto) {
    return await this.userService.loginUser(loginUser);
  }
}
