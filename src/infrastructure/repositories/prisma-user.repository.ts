// src/infrastructure/repositories/prisma-user.repository.ts
import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../domain/interfaces/user.repository';
import { User } from '../../domain/entities/user.entity';
import { PrismaService } from '../orm/prisma.service';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async save(user: User): Promise<User> {
    const savedUser = await this.prisma.user.create({
      data: {
        username: user.username,
        password: user.getPassword(),
        phone: user.phone,
        address: user.getAddress(),
        email: user.email,
        fullName: user.fullName ?? '',
        image: user.image ?? '',
      },
    });
    return new User(
      savedUser.username ?? '',
      savedUser.password ?? '',
      savedUser.phone ?? '',
      savedUser.address ?? '',
      savedUser.email ?? '',
      savedUser.fullName ?? '',
      savedUser.image ?? '',
    );
  }

  async findByUsername(username: string): Promise<User | null> {
    const user = await this.prisma.user.findFirst({ where: { username: username } });
    return user
      ? new User(
          user.username,
          user.password,
          user.phone ?? '',
          user.address ?? '',
          user.email,
          user.fullName ?? '',
          user.image ?? '',
        )
      : null;
  }


async findAllUsers(): Promise<User[]> {
   const users = await this.prisma.user.findMany();
    return users ? users.map(user => new User(
    user.username,
    user.password,
    user.phone ?? '',
    user.address ?? '',
    user.email,
    user.fullName ?? '',
  )): [];
}
}
