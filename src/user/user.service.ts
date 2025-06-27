import { ConflictException, Injectable, NotFoundException, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { FilterQuery, Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {}
  @Post()
  async createUser(createUserDto: CreateUserDto) {
    const existingUser = await this.userModel.findOne({email: createUserDto.email})
    if(existingUser){
      throw new ConflictException('Email alrealdy exist')
    }
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const creatUser = await new this.userModel({
      ...createUserDto,
      password: hashedPassword,
    }).save();
  }

  async getUser(query: FilterQuery<User>){
    const user = (await this.userModel.findOne(query))?.toObject();
    if(!user){
      throw new NotFoundException('User not found');
    }
    return user;
  }
}
