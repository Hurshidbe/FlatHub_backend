import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post("add")
  async add(@Body() userdata : CreateUserDto){
    try {
     userdata.password_hash  = await this.usersService.password_hasher(userdata.password_hash) 
     return await this.usersService.create(userdata)
    } catch (error) {
      throw new HttpException(error.message , error.status)
    }
  }
}
