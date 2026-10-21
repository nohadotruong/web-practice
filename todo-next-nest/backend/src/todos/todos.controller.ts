// /backend/src/todos/todos.controller.ts
import { Controller, Get, Post, Body, Param, Patch } from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';

@Controller('todos') // Đường dẫn API là /todos
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  // POST /todos: Tạo công việc mới
  @Post()
  create(@Body() createTodoDto: CreateTodoDto) {
    // Dữ liệu body phải khớp với CreateTodoDto (chỉ có 'title')
    return this.todosService.create(createTodoDto);
  }

  // GET /todos: Lấy tất cả công việc
  @Get()
  findAll() {
    return this.todosService.findAll();
  }

  // PATCH /todos/:id: Cập nhật trạng thái
  @Patch(':id')
  update(@Param('id') id: string, @Body('isDone') isDone: boolean) {
    // @Param('id') lấy id từ URL. @Body('isDone') chỉ lấy trường isDone từ body
    // Phải chuyển id từ string sang number
    return this.todosService.update(+id, isDone);
  }
}
