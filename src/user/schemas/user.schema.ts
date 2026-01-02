import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { UserRole } from '../user.role';
import * as bcrypt from 'bcrypt';
import { timestamp } from 'rxjs';

interface UserMethods {
  comparePassword(candidatePassword: string): Promise<boolean>;
}
export type UserDocument = HydratedDocument<User, UserMethods>;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: [true, 'Name is required'] })
  name: string;

  @Prop({
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
  })
  email: string;

  @Prop({ required: true, select: false })
  password: string;

  @Prop({
    required: [true],
    type: String,
    enum: [UserRole],
    default: UserRole.USER,
  })
  role: UserRole;
}

export const UserSchema = SchemaFactory.createForClass(User);

// Automatic password hashing
UserSchema.pre('save', async function () {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
});

UserSchema.methods.comparePassword = async function (
  candidatePassword: string,
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};
