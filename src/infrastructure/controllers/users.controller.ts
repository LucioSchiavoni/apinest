// src/infrastructure/controllers/users.controller.ts
import { Controller, Post, Body, Get, UseInterceptors, UploadedFile, UseGuards, Request } from '@nestjs/common';
import { CreateUserService } from '../../application/services/create-user.service';
import { CreateUserDto } from '../../application/dto/create-user.dto';
import { GetUserService } from 'src/application/services/get-user.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';


@Controller('users')
export class UsersController {
  constructor(
    private readonly createUserService: CreateUserService,
    private readonly getUserService: GetUserService
) {}

  @Post()
  async create(
    @Body() createUserDto: CreateUserDto,
    @UploadedFile() image: Express.Multer.File) {
    return await this.createUserService.execute(createUserDto, image);
  }

  @Get()
  async findAll() {
    return await this.getUserService.execute();
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;  
  }
}
