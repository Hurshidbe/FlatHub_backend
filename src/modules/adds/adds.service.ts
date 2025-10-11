import {
  BadGatewayException,
  BadRequestException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAddDto } from './dto/createAdd.dto';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Add, AddDocument } from './entities/add.entity';
import { User, UserDocument } from '../users/entities/user.entity';
import { UpdateAddDto } from './dto/updateAdd.dto';

@Injectable()
export class AddsService {
  constructor(@InjectModel(Add.name) private AddRepo: Model<AddDocument>,
              @InjectModel(User.name) private UserRepo : Model<UserDocument>) {}

  async create(body: CreateAddDto, userId: string) {  
    return await  this.AddRepo.create({...body,  owner : userId })
  }

 async update(addId: string, body: UpdateAddDto, userId: string) {
    if(await this.isOwnAdd(addId, userId))
    return await this.AddRepo.findByIdAndUpdate(addId, body, { new: true });
}

  async findOne(addId: string , userId: string){
    if(await this.isOwnAdd(addId, userId))
    return await this.AddRepo.findById(addId);
}

  async getAll(userId : string){
     return this.AddRepo.find({owner:userId})
  }

  async isOwnAdd(addId: string , userId : string){
    const add = await this.AddRepo.findById(addId);
      if (!add) throw new NotFoundException('Add not found')
      if (add.owner.toString() !== userId) throw  new BadRequestException('You can update only your own adds')
      return true
  }
  async mapUrlCreator(lat: number, lng: number) {
    const baseUrl = 'https://www.google.com/maps?q=';
    return `${baseUrl}${lat},${lng}`;
  }




}
