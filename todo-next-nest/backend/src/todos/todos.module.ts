// /backend/src/todos/todos.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; // Phải import TypeOrmModule
import { TodosService } from './todos.service';
import { TodosController } from './todos.controller';
import { Todo } from './todo.entity'; // Phải import Entity

@Module({
  // Đăng ký Entity với TypeOrmModule để nó cung cấp Repository
  imports: [TypeOrmModule.forFeature([Todo])],

  controllers: [TodosController],
  providers: [TodosService],
  // (Không cần exports ở đây nếu module này chỉ dùng nội bộ)
})
export class TodosModule {}
