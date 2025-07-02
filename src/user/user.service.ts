import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { FilterQuery, Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';

export interface PaginationOptions {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface UserFilter {
  role?: string;
  isActive?: boolean;
  search?: string;
}

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    const existingUser = await this.userModel.findOne({
      email: createUserDto.email,
    });
    if (existingUser) {
      throw new ConflictException('Email alrealdy exist');
    }
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const user = await new this.userModel({
      ...createUserDto,
      password: hashedPassword,
    }).save();
    return user.toObject();
  }

  async findByEmail(email: string) {
    const user = await this.userModel.findOne({ email }).lean().exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async findById(id: string) {
    const user = await this.userModel.findById(id).lean().exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async deleteUser(id: string) {
    const user = await this.userModel.findByIdAndDelete(id).lean().exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}
