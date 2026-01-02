import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Result } from 'src/result';

export interface Task {
  id: string;
  title: string;
  description?: string;
  isCompleted: boolean;
  createdAt: Date;
}

@Injectable()
export class TodoService {
  private tasks: Task[] = [];

  create(createTodoDto: CreateTodoDto) {
    const newTask: Task = {
      id: crypto.randomUUID(),
      ...createTodoDto,
      isCompleted: false,
      createdAt: new Date(),
    }
    this.tasks.push(newTask);
    return Result.success(newTask, "Todo Created Successfully");
  }

  findAll() {
    return this.tasks;
  }

  findOne(id: number) {
    return `This action returns a #${id} todo`;
  }

  update(id: number, updateTodoDto: UpdateTodoDto) {
    return `This action updates a #${id} todo`;
  }

  remove(id: number) {
    return `This action removes a #${id} todo`;
  }
}
