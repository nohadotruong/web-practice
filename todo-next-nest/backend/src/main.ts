// /backend/src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Thêm dòng này để NestJS cho phép Frontend kết nối (CORS)
  app.enableCors({
    origin: 'http://localhost:3000', // Cho phép Next.js Frontend kết nối
  });

  // Lấy PORT từ biến môi trường (hoặc dùng 5000 nếu không tìm thấy)
  const port = process.env.PORT || 5000;

  // Khởi chạy ứng dụng trên cổng đã chỉ định
  await app.listen(port);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
