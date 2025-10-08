import { Injectable } from '@nestjs/common';
import { CreateAddDto } from './dto/createAdd.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Add, AddDocument } from './entities/add.entity';

@Injectable()
export class AddsService {
  constructor(@InjectModel(Add.name) private AddRepo: Model<AddDocument>) {}

  async create(body: CreateAddDto, userId: string) {  
    return await  this.AddRepo.create({...body,  owner : userId })
  }

  async mapUrlCreator(lat: number, lng: number) {
    const baseUrl = 'https://www.google.com/maps?q=';
    return `${baseUrl}${lat},${lng}`;
  }
}
