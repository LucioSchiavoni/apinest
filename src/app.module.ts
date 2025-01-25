//Conecta todos los modulos de la aplicacion

import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
