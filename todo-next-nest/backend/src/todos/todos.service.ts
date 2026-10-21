// /backend/src/todos/todos.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './todo.entity';
import { CreateTodoDto } from './dto/create-todo.dto'; // Cần tạo file DTO

@Injectable()
export class TodosService {
  constructor(
    // 1. Inject Repository để TypeORM có thể tương tác với bảng 'todos'
    @InjectRepository(Todo)
    private todosRepository: Repository<Todo>,
  ) {}

  // 2. Lấy tất cả công việc
  findAll(): Promise<Todo[]> {
    return this.todosRepository.find();
  }

  // 3. Tạo một công việc mới
  create(createTodoDto: CreateTodoDto): Promise<Todo> {
    const newTodo = this.todosRepository.create(createTodoDto);
    return this.todosRepository.save(newTodo);
  }

  // 4. Cập nhật trạng thái
  async update(id: number, isDone: boolean): Promise<Todo> {
    // Tìm công việc theo ID
    const todo = await this.todosRepository.findOneBy({ id });
    if (!todo) {
      // Xử lý nếu không tìm thấy, có thể throw NotFoundException
      throw new Error('Todo not found');
    }
    todo.isDone = isDone; // Cập nhật trạng thái
    return this.todosRepository.save(todo); // Lưu vào DB
  }
}
