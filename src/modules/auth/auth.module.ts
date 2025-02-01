import { Module } from '@nestjs/common';
import { AuthService } from 'src/application/services/auth.service';
import { AuthController } from 'src/infrastructure/controllers/auth.controller';
import { LocalStrategy } from 'src/infrastructure/auth/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/infrastructure/auth/jwt.strategy';
import { USER_REPOSITORY } from 'src/domain/interfaces/user.repository';
import { PrismaUserRepository } from 'src/infrastructure/repositories/prisma-user.repository';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from 'src/infrastructure/orm/prisma.module';

@Module({
  imports: [
    PrismaModule,
    ConfigModule,
      JwtModule.register({
      secret: process.env.JWT_SECRET || 'default_secret',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    { provide: USER_REPOSITORY, useClass: PrismaUserRepository },
  ],
})
export class AuthModule {}
