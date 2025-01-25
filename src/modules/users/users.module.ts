//Aqui se relaciona el createUserService con el prismaUserRepository tambien se trae la conexion de prisma 
//Se llama el controlador que use los siguientes servicios
// src/modules/users/users.module.ts
import { Module } from '@nestjs/common';


import { CreateUserService } from '../../application/services/create-user.service';


@Module({
  controllers: [],
  providers: [
    //PrismaService,
    // { provide: 'UserRepository', useClass: PrismaUserRepository },
    CreateUserService,
  ],
})
export class UsersModule {}



