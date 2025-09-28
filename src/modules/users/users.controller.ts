import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, LoginDto } from './dto/create-user.dto';
import { Response, response } from 'express';
import AuthGuard from '../../guards/autthGuard';
import { ResponseInterceptor } from '../../response/response.interceptor';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post("auth")
  async add(@Body() userdata : CreateUserDto){
    try {
     if(userdata.password===userdata.repeat_password)
        userdata.password  = await this.usersService.password_hasher(userdata.password);
        return await this.usersService.create(userdata)
    } catch (error) {
      throw new HttpException(error.message , error.status)
    }
  }

  @Post("login")
  async login(
    @Body() body: LoginDto,
    @Res({ passthrough: true }) res: any,
  ) {
    try {
      const { message, token } = await this.usersService.login(body);
      res.cookie("authToken", token, { httpOnly: true });
      return { message };
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }


  @UseGuards(AuthGuard)
  @Get()
  async sayhello(){
    try {
     return "hello"
    }catch (erroe){
  return  'fuck nigers'
    }
  }
}
