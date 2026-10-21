// /backend/src/app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config'; // Import ConfigModule
import { TodosModule } from './todos/todos.module';

@Module({
  imports: [
    // 1. Cấu hình để đọc biến môi trường từ file .env
    ConfigModule.forRoot({
      isGlobal: true, // Biến môi trường có sẵn trong toàn bộ ứng dụng
    }),

    // 2. Cấu hình TypeORM (PostgreSQL)
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get<string>('DATABASE_URL'), // Lấy URL từ .env
        autoLoadEntities: true, // Tự động load các entity đã khai báo
        synchronize: true, // Tự động tạo bảng (CHỈ NÊN DÙNG KHI DEV!)
      }),
      inject: [ConfigService],
    }),

    TodosModule, // Import module cho các công việc
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
