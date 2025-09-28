import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';

import { AppModule } from './app.module';
<<<<<<< HEAD
import { ValidationError } from 'class-validator';
import { ValidationPipe } from '@nestjs/common';
import { parser } from 'typescript-eslint';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser())
  app.setGlobalPrefix(process.env.API as string)
  app.useGlobalPipes(new ValidationPipe())
=======
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe())
  app.setGlobalPrefix("api/v1")
>>>>>>> master
  await app.listen(process.env.PORT ?? 3000);
  console.warn(`server is running on ${process.env.PORT}`)
}
bootstrap();
