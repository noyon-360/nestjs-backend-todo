import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TodoDocument = HydratedDocument<Todo>;

@Schema({
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class Todo {
  @Prop({
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [120, 'Title connat be longer 120 characters'],
  })
  title: string;

  @Prop({
    trim: true,
    maxlength: [500, 'Description cannot be longer than 500 characters'],
  })
  description?: string;

  @Prop({
    type: Boolean,
    default: false,
    index: true,
  })
  isCompleted: boolean;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);
TodoSchema.index({ title: 'text' });