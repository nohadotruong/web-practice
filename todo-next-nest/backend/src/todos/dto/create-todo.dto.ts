// /backend/src/todos/dto/create-todo.dto.ts
// Dùng để định nghĩa hình dạng dữ liệu khi gửi request POST
export class CreateTodoDto {
  title: string;
}
// Ta không cần isDone vì service sẽ đặt mặc định là false
