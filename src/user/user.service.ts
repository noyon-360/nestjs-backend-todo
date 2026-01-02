import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/get-user.dto';
import { Result } from 'src/result';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    console.log('Create user data : ', createUserDto);
    const emailExist = await this.userModel.findOne({
      email: createUserDto.email,
    });

    if (emailExist) {
      throw new ConflictException('This email is already registered.');
    }
    try {
      const userData = new this.userModel(createUserDto);
      return userData.save();
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('Email already exists');
      }
      throw error;
    }
  }

  // Login / validation method
  async validateUser(
    email: string,
    plainPassword: string,
  ): Promise<UserDocument | null> {
    const user = await this.userModel
      .findOne({ email: email.toLowerCase() })
      .select('+password');

    if (!user) {
      return null;
    }

    // Now TypeScript knows comparePassword exists!
    const isMatch = await user.comparePassword(plainPassword);

    if (!isMatch) {
      return null;
    }

    return user;
  }

  async findByEmail(getUserDto: LoginUserDto) {
    console.log('User login info');
    return getUserDto;
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
