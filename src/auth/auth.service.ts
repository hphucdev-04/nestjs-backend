import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { User } from 'src/user/schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { LoginDto } from './dto/login.dto';
import { UserService } from 'src/user/user.service';
import passport, { authenticate } from 'passport';

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
  
  ){}
  async verifyUser(loginDto: LoginDto) {
    try {
      const user = await this.userService.getUser({ email: loginDto.email });
      const authenticated = await bcrypt.compare(loginDto.password,user.password)
      if(!authenticate){
        throw new UnauthorizedException();
      }
    } catch (error) {
      throw new UnauthorizedException('');
    }
  }

}

