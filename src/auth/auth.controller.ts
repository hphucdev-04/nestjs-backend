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
  Req,
  Res,
  HttpCode,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';
import { LoginDto } from './dto/login.dto';
import { LocalAuthGuard } from 'src/auth/guards/local.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { plainToInstance } from 'class-transformer';
import { UserResponseDto } from 'src/user/dto/user-response.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto) {
    const { user, token } = await this.authService.signup(createUserDto);
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
  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  async signin(@Req() req: any, @Res({ passthrough: true }) res: Response) {
    const { user, token } = await this.authService.signin(req.user, res);

    const response = plainToInstance(UserResponseDto, user, {
      excludeExtraneousValues: true,
    });

    return {
      message: 'User signed in successfully',
      user: response,
      accessToken: token,
    };
  }

  @Post('signout')
  @UseGuards(JwtAuthGuard)
  async signout(@Res({ passthrough: true }) res: Response) {
    this.authService.signout(res);
    return {
      message: 'User signed out successfully',
    };
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async getProfile(@Request() req) {
    return req.user;
  }
}
