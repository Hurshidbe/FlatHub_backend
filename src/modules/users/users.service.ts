import { HttpException, Injectable } from '@nestjs/common';
import { UserDto, LoginDto, ChangePasswordDto } from './dto/user.dto';
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

  async create(userdata : UserDto){
    return this.userRepo.create(userdata)
  };

  async login(userdata: LoginDto){
    userdata.phone=`998${userdata.phone}`.toString()
    const user = await this.userRepo.findOne({ phone: userdata.phone });
    if (!user)
      throw new HttpException('phone number or password incorrect', 402);

    const iscompared = await bcrypt.compare(
      userdata.password,
      user.password,
    );
    if (!iscompared)
      throw new HttpException('password incorrect', 402);
    const  token = await  this.jwt.signAsync({
      id : user._id,
      full_name : user.full_name,
      sex : user.sex,
      telegram : user.telegram,
      phone: user.phone
    })
    return {message : "success"  , token : token}
  };

  async phoneVerifier(phone : string){
    return await this.userRepo.findOneAndUpdate({phone}, {phone_verified:true}, {new:true})
  }

  async password_hasher(password:string) {
    return bcrypt.hash(password, 12)
  };
  async password_compare(inputPassword:string , hashed_password:string){
    return bcrypt.compare(inputPassword , hashed_password)
  }

  async customPhoneNumber (number: string){
    return await `998${number}`
  }

  
  async changePassword(body: ChangePasswordDto, userdata : any){
    if(body.newPassword === body.reNewPassword){
      const user = await  this.userRepo.findOne({phone:userdata.phone})
      if(user){
       const passwordCheck  = await bcrypt.compare(body.oldPassword, user.password)
       if(!passwordCheck) {throw new HttpException("your password is incorrect",403)}
        const  password = await  bcrypt.hash(body.reNewPassword, 12)
       if(passwordCheck) return await this.userRepo.findOneAndUpdate({phone : userdata.phone}, {password}, {new :true})
      }
    }
  }

  async editProfile(body : UpdateUserDto, id : string){
    return await this.userRepo.findByIdAndUpdate(id , body , {new : true})
  }
}
