// src/infrastructure/controllers/users.controller.ts
import { Controller, Post, Body, Get, UseInterceptors } from '@nestjs/common';
import { CreateUserService } from '../../application/services/create-user.service';
import { CreateUserDto } from '../../application/dto/create-user.dto';
import { GetUserService } from 'src/application/services/get-user.service';


@Controller('users')
export class UsersController {
  constructor(
    private readonly createUserService: CreateUserService,
    private readonly getUserService: GetUserService
) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.createUserService.execute(createUserDto);
  }

  @Get()
  async findAll() {
    return await this.getUserService.execute();
  }
}
