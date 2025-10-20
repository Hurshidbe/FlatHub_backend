import {
  BadGatewayException,
  BadRequestException,
  HttpException,
  Injectable,
  NotFoundException,
  UseInterceptors,
} from '@nestjs/common';
import { CreateAddDto } from './dto/createAdd.dto';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Add, AddDocument } from './entities/add.entity';
import { User, UserDocument } from '../users/entities/user.entity';
import { UpdateAddDto } from './dto/updateAdd.dto';
import { idText } from 'typescript';

@Injectable()
export class AddsService {
  constructor(@InjectModel(Add.name) private AddRepo: Model<AddDocument>,
              @InjectModel(User.name) private UserRepo : Model<UserDocument>) {}

  async create(body: CreateAddDto, userId: string) {  
    await this.checkAddLimit(userId)
    const locationLink = await this.mapUrlCreator(body.location.lat , body.location.lng)
    return await  this.AddRepo.create({...body,  owner : userId , location : locationLink})
  }

 async update(addId: string, body: UpdateAddDto, userId: string) {
    if(await this.isOwnAdd(addId, userId))
    return await this.AddRepo.findByIdAndUpdate(addId, body, { new: true });
  }

  async findOne(addId: string , userId: string){
    if(await this.isOwnAdd(addId, userId))
    await this.watch(addId)
    return await this.AddRepo.findById(addId);
  }

  async getAll(userId : string){
     return await this.AddRepo.find({owner:userId})
  }

  async deleteOne(addId : string, userId : string){
    if(await this.isOwnAdd(addId , userId))
    return await this.AddRepo.findByIdAndDelete(addId)
  }

  async like(addId: string){
    return await this.AddRepo.findByIdAndUpdate(addId , { $inc : {likes : 1}} , {new : true})
  }

  async unlike(addId : string){
    return await this.AddRepo.findByIdAndUpdate(addId, {$inc : {likes : -1}} , {new : true})
  }

  async watch(addId :string){
    return this.AddRepo.findByIdAndUpdate(addId , {$inc :{watched : 1}} , {new : true})
  }

   async report(userId :string, addId :string, message : string){
    const createdReport= `from ${userId} message : ${message}`
   return await this.AddRepo.findByIdAndUpdate(
    addId, {$push: {reports : createdReport}},{new: true})
  }
  async isOwnAdd(addId: string , userId : string){
    const add = await this.AddRepo.findById(addId);
      if (!add) throw new NotFoundException('Add not found')
      if (add.owner.toString() !== userId) throw  new BadRequestException('You can update only your own adds')
      return true
  }

  async checkAddLimit(userId: string) {
    const now = new Date();
    const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const existingAdd = await this.AddRepo.findOne({ owner: userId, createdAt: { $gte: yesterday }});
    if (existingAdd) throw new BadRequestException( 'daily limit reached');
    return true
    }
  

  async mapUrlCreator(lat: number, lng: number) {
    const baseUrl = 'https://www.google.com/maps?q=';
    return `${baseUrl}${lat},${lng}`;
  }

  async isBlockedUser (userId : string){
     const user = await this.UserRepo.findById(userId)
     if(user?.is_blocked === false)
      return true
  }
}
