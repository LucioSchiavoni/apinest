import { Module } from '@nestjs/common';
import { CreateUserService } from '../../application/services/create-user.service';
import { PrismaUserRepository } from 'src/infrastructure/repositories/prisma-user.repository';
import { PrismaService } from 'src/infrastructure/orm/prisma.service';
import { USER_REPOSITORY } from 'src/domain/interfaces/user.repository';
import { GetUserService } from 'src/application/services/get-user.service';
import { UsersController } from 'src/infrastructure/controllers/users.controller';
import { PrismaModule } from 'src/infrastructure/orm/prisma.module';
import { LocalFileStorageAdapter } from 'src/infrastructure/adapters/file-storage.adapter';

@Module({
  imports: [PrismaModule],
  controllers: [UsersController],
  providers: [
    { provide: USER_REPOSITORY, useClass: PrismaUserRepository },
    {provide: 'Filestorage', useClass: LocalFileStorageAdapter},
    CreateUserService,
    GetUserService,
  ],
  exports: [CreateUserService,
    GetUserService,
     { provide: USER_REPOSITORY, useClass: PrismaUserRepository },
     {provide: 'Filestorage', useClass: LocalFileStorageAdapter},
    
    ],
})
export class UsersModule {}
