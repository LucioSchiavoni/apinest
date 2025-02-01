import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT ?? 3000;
  app.use('/uploads', express.static(join(__dirname, '..', 'src/infrastructure/uploads')));
  await app.listen(port); 
  console.log("🚀 Starting server on port:", port);
}
bootstrap();
