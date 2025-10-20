import { Module } from '@nestjs/common';
import { AddsService } from './adds.service';
import { AddsController } from './adds.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Add, AddSchema } from './entities/add.entity';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { User, UserSchema } from '../users/entities/user.entity';
import { AiService } from '../ai/ai.service';
import { AiModule } from '../ai/ai.module';

@Module({
  imports :[
    MongooseModule.forFeature([
      {name : Add.name , schema: AddSchema},
      {name :User.name, schema: UserSchema}
    ]),
    AiModule
  ],
  controllers: [AddsController],
  providers: [AddsService, CloudinaryService, AiService],
})
export class AddsModule {}
