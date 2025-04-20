// auth-service/src/app.module.ts
import * as dotenv from 'dotenv';
import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';  // Import AuthModule
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './auth/user.entity'; // Assuming you have a User entity for DB
dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [User],
      synchronize: true, // true for dev purposes, don't use in production
      autoLoadEntities: true
    }),
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
