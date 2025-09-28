import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto, LoginDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import  bcrypt from "bcrypt"
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './entities/user.entity';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class UsersService {
  constructor(private jwt: JwtService,
    @InjectModel(User.name) private readonly userRepo : Model<UserDocument>){}

  async create(userdata : CreateUserDto){
    return this.userRepo.create(userdata)
  };

  async login(userdata: LoginDto){
    const user = await this.userRepo.findOne({ phone: userdata.phone });
    if (!user)
      throw new HttpException('phone number or password incorrect', 402);

    const iscompared = await bcrypt.compare(
      userdata.password,
      user.password,
    );
    if (!iscompared)
      throw new HttpException('phone number or password incorrect', 402);
    const  token = await  this.jwt.signAsync({
      id : user._id,
      full_name : user.full_name,
      sex : user.sex,
      telegram : user.telegram
    })
    return {message : "success"  , token : token}
  };

  async password_hasher(password:string) {
    return bcrypt.hash(password, 12)
  };
  async password_compare(inputPassword:string , hashed_password:string){
    return bcrypt.compare(inputPassword , hashed_password)
  }
}
