import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import  bcrypt from "bcrypt"
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './entities/user.entity';
import { Model } from 'mongoose';
@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userRepo : Model<UserDocument>){}

  async create(userdata : CreateUserDto){
  return this.userRepo.create(userdata)
  }






  async password_hasher(password:string) {
    return bcrypt.hash(password, 12)
  }

  async password_compare(inputPassword:string , hashed_password:string){
    return bcrypt.compare(inputPassword , hashed_password)
  }
}
