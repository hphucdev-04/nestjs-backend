import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class LoginDto {
  @IsString()
  @IsNotEmpty({message:'Email must not be empty'})
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty({message:'Password must not be empty'})
  password: string;
}
