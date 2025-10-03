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
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto, LoginDto, ChangePasswordDto } from './dto/user.dto';
import AuthGuard from '../../guards/autthGuard';
import { ResponseInterceptor } from '../../response/response.interceptor';
import { SmsService } from '../sms/sms.service';
import { UpdateUserDto } from './dto/update-user.dto';

const custom_message = 'Bu Eskiz dan test';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService,
              private readonly SmsService : SmsService) {}

  @Post("auth")
  async add(@Body() userdata : UserDto){
    
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
  @Patch('change-pass')
  async change_pass(@Req() req:any,@Body() body: ChangePasswordDto){
    try {
      return await this.usersService.changePassword(body, req.user)
    }catch(error){
      throw  new HttpException(error.message , error.status)
    }
  }

  @UseGuards(AuthGuard)
  @Patch('edit')
  async editProfile(@Req() req : any ,@Body() body: UpdateUserDto ){
    try {
      const userId = req.user.id;
      return await this.usersService.editProfile(body , userId)
    } catch (error) {
      throw new HttpException(error.message , error.status)
    }
  }
  

  @UseGuards(AuthGuard)
  @Post('logout')
  logout(@Res({ passthrough: true }) res: any) {
    res.clearCookie('authToken', { httpOnly: true, path: '/' });
    return { message: 'Logged out successfully' };
  }  

  


  /// get my ads

  /// get my ad byid

  /// edit my ad byid

  /// delete my ad byid

  

  /// edit my info

  /// logout




}
