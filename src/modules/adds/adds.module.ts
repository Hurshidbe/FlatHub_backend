import { Module } from '@nestjs/common';
import { AddsService } from './adds.service';
import { AddsController } from './adds.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Add, AddSchema } from './entities/add.entity';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Module({
  imports :[
    MongooseModule.forFeature([
      {name : Add.name , schema: AddSchema}
    ])
  ],
  controllers: [AddsController],
  providers: [AddsService, CloudinaryService],
})
export class AddsModule {}
