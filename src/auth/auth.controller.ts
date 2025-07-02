import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';
import { LoginDto } from './dto/login.dto';
import { LocalAuthGuard } from 'src/guards/local.guard';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { plainToInstance } from 'class-transformer';
import { UserResponseDto } from 'src/user/dto/user-response.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto) {
    const {user, token} = await this.authService.signup(createUserDto);
    const response = plainToInstance(UserResponseDto, user, {
      excludeExtraneousValues: true,
    });
    return {
      message: 'User signed up successfully',
      user: response,
      accessToken: token,
    };
  }

  @Post('signin')
  @UseGuards(LocalAuthGuard)
  async signin(@Body() loginDto: LoginDto) {}

  @Post('signout')
  async sigout() {}

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async getProfile(@Request() req) {
    return req.user;
  }
}
