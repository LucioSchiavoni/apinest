//Conecta todos los modulos de la aplicacion

import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { ProductModule } from './modules/product/product.module';
import * as path from 'path';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UsersModule,
    MulterModule.register({
      dest: path.join(__dirname, '../infraestructure/uploads') 
    }),
    ProductModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
