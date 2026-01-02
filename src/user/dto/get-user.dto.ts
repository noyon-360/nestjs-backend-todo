import { IsEmail, IsEnum, IsString } from 'class-validator';
import { UserRole } from '../user.role';

export class LoginUserDto {
  @IsEmail({}, { message: 'Please provide a valid email address' })
  email: string;

  @IsString()
  password: string;
}
