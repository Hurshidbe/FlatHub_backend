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
import { SmsService } from '../sms/sms.service';

const custom_message = 'Bu Eskiz dan test';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService,
              private readonly SmsService : SmsService) {}

  @Post("auth")
  async add(@Body() userdata : CreateUserDto){
    
  try {
     if (!userdata.phone_verified) {
        if (userdata.password !== userdata.repeat_password) {
          throw new HttpException('Passwords do not match', 400);
        }
        userdata.password = await this.usersService.password_hasher(userdata.password)
       userdata.phone = await  this.usersService.customPhoneNumber(userdata.phone)
        const user = await this.usersService.create(userdata);
        await this.SmsService.sendSms(userdata.phone, custom_message);
      }
      //// hurshidbe: sorry. Now I hava not access to sending codes now. I can send now only custom_message.
     return await  this.usersService.phoneVerifier(userdata.phone)
  } catch (error) {
    throw new HttpException(error.message , error.status);
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
    }catch (error){
  return  'fuck nigers'
    }
  }
}
