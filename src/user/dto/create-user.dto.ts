import {
  IsEmail,
  IsEnum,
  IsString,
} from 'class-validator';
import { UserRole } from '../user.role';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsEmail({}, { message: 'Please provide a valid email address' })
  email: string;

  @IsString()
  password: string;

  @IsEnum(UserRole, { message: 'Role need to be define' })
  role: string;
}
