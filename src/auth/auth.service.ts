import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { User } from 'src/user/schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { LoginDto } from './dto/login.dto';
import { UserService } from 'src/user/user.service';
import { Response } from 'express';

export type TokenPayload = {
  sub: string;
  email: string;
  role?: string;
};

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  private setCookie(res: Response, token: string) {
    res.cookie('Authentication', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000,
    });
  }

  private clearCookie(res: Response) {
    res.clearCookie('Authentication');
  }

  async verifyUser(loginDto: LoginDto) {
    try {
      const user = await this.userService.findByEmail(loginDto.email);
      const authenticated = await bcrypt.compare(
        loginDto.password,
        user.password,
      );
      if (!authenticated) {
        throw new UnauthorizedException('Invalid email or password');
      }
      return user;
    } catch (error) {
      throw new UnauthorizedException('Invalid email or password');
    }
  }

  async signup(createUserDto: CreateUserDto) {
    const user = await this.userService.createUser(createUserDto);
    const payload: TokenPayload = {
      sub: user._id.toString(),
      email: user.email,
      role: user.role,
    };
    const token = this.jwtService.sign(payload);
    return {
      user,
      token,
    };
  }

  async signin(user: any, res: Response) {
    const payload: TokenPayload = {
      sub: user._id ? user._id.toString() : user.id.toString(),
      email: user.email,
      role: user.role,
    };
    const token = this.jwtService.sign(payload);

    // Set cookie
    this.setCookie(res, token);

    return {
      user,
      token,
    };
  }

  async signout(res: Response){
    this.clearCookie(res);
  }
}
