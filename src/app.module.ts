import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookModule } from './book/book.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'root',
      password: 'root',
      database: 'postgres',
      autoLoadEntities: true,
      synchronize: true,
    }),
    BookModule,
  ],
})
export class AppModule {}
