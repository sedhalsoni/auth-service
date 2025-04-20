import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { User } from './user.entity';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }), // configure as needed
    TypeOrmModule.forFeature([User]), // this registers UserRepository
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
