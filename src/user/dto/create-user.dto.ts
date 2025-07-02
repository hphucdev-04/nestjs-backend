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
  IsNotEmpty,
} from 'class-validator';
import { Transform } from 'class-transformer';

export enum UserRole {
  WAITER = 'waiter',
  CASHIER = 'cashier',
  ADMIN = 'admin',
}

export class CreateUserDto {
  @IsString({ message: 'First name must be a string' })
  @IsNotEmpty({ message: 'First name must not be empty' })
  @MinLength(2, { message: 'First name must be at least 2 characters long' })
  @MaxLength(50, { message: 'First name must not exceed 50 characters' })
  @Matches(/^[\p{L}\s]+$/u, {
    message: 'First name must contain only letters and spaces',
  })
  @Transform(({ value }) => value?.trim())
  firstname: string;

  @IsString({ message: 'Last name must be a string' })
  @IsNotEmpty({ message: 'Last name must not be empty' })
  @MinLength(2, { message: 'Last name must be at least 2 characters long' })
  @MaxLength(50, { message: 'Lats name must not exceed 50 characters' })
  @Matches(/^[\p{L}\s]+$/u, {
    message: 'Last name must contain only letters and spaces',
  })
  @Transform(({ value }) => value?.trim())
  lastname: string;

  @IsEmail({}, { message: 'Invalid email address' })
  email: string;

  @IsString({ message: 'Password must be a string' })
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  @MaxLength(32, { message: 'Password must not exceed 32 characters' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/, {
    message:
      'Password must include at least one uppercase letter, one lowercase letter, one number, and one special character',
  })
  password: string;

  @IsOptional()
  @IsEnum(UserRole, { message: 'Invalid role' })
  role?: UserRole = UserRole.WAITER;

  @IsOptional()
  @IsPhoneNumber('VN', { message: 'Invalid phone number' })
  phone?: string;

  @IsOptional()
  @IsBoolean({ message: 'isActive must be a boolean value' })
  @Transform(({ value }) => {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return value;
  })
  isActive?: boolean = false;
}
