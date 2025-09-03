import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { plainToInstance } from 'class-transformer';
import { UserResponseDto } from './dto/user-response.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    const createdUser = await this.userService.createUser(createUserDto);
    const response = plainToInstance(UserResponseDto, createdUser, {
      excludeExtraneousValues: true,
    });
    return {
      message: 'User created successfully',
      user: response,
    };
  }
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.userService.findById(id);
    const response = plainToInstance(UserResponseDto, user, {
      excludeExtraneousValues: true,
    });
    return {
      message: 'User retrieved successfully',
      user: response,
    };
  }

  @Post(':id')
  async deleteUser(@Param('id') id: string) {
    await this.userService.deleteUser(id);
    return {
      message: 'User deleted successfully',
    };
  }
}
