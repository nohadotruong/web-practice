// /backend/src/todos/todo.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('todos') // Tên bảng trong database là 'todos'
export class Todo {
  @PrimaryGeneratedColumn()
  id: number; // Khóa chính, tự động tăng

  @Column()
  title: string; // Tên/Tiêu đề công việc

  @Column({ default: false })
  isDone: boolean; // Trạng thái hoàn thành (mặc định là false)
}
