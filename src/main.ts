
import * as dotenv from 'dotenv';
dotenv.config();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:3000', // Your Next.js frontend
    credentials: true,
  });
  await app.listen(process.env.PORT ?? 8000);
}
bootstrap();
