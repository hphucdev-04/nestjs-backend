import {
    IsString,
    IsEmail,
    IsPhoneNumber,
    IsEnum,
    IsOptional,
    IsBoolean,
    MinLength,
    MaxLength,
    Matches,
    IsNotEmpty
  } from 'class-validator';
  import { Transform } from 'class-transformer';
  
  export enum UserRole {
    SERVER = 'server',
    CASHIER = 'cashier',
    MANAGER = 'manager',
    ADMIN = 'admin'
  }
  
  export class CreateUserDto {
    @IsString({ message: 'Username must be a string' })
    @IsNotEmpty({ message: 'Username must not be empty' })
    @MinLength(3, { message: 'Username must be at least 3 characters long' })
    @MaxLength(20, { message: 'Username must not exceed 20 characters' })
    @Matches(/^[a-zA-Z0-9_]+$/, {
      message: 'Username can only contain letters, numbers, and underscores'
    })
    username: string;
  
    @IsString({ message: 'Password must be a string' })
    @MinLength(6, { message: 'Password must be at least 6 characters long' })
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/, {
      message: 'Password must include at least one uppercase letter, one lowercase letter, one number, and one special character'
    })
    password: string;
  
    @IsString({ message: 'Full name must be a string' })
    @IsNotEmpty({ message: 'Full name must not be empty' })
    @MinLength(2, { message: 'Full name must be at least 2 characters long' })
    @MaxLength(50, { message: 'Full name must not exceed 50 characters' })
    @Matches(/^[\p{L}\s]+$/u, {
      message: 'Full name must contain only letters and spaces'
    })
    @Transform(({ value }) => value?.trim())
    fullName: string;
  
    @IsEnum(UserRole, { message: 'Invalid role' })
    role: UserRole;
  
    @IsOptional()
    @IsPhoneNumber('VN', { message: 'Invalid phone number' })
    phoneNumber?: string;
  
    @IsOptional()
    @IsEmail({}, { message: 'Invalid email address' })
    email?: string;
  
    @IsOptional()
    @IsBoolean({ message: 'isActive must be a boolean value' })
    @Transform(({ value }) => {
      if (value === 'true') return true;
      if (value === 'false') return false;
      return value;
    })
    isActive?: boolean = true;
  }
  