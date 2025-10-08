import {
  Body,
  Controller,
  HttpException,
  Post,
  Req,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AddsService } from './adds.service';
import { CreateAddDto } from './dto/createAdd.dto';
import AuthGuard from '../../guards/autthGuard';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { FilesInterceptor } from '@nestjs/platform-express';

@UseGuards(AuthGuard)
@Controller('adds')
export class AddsController {
  constructor(private readonly addsService: AddsService, private readonly cloudService : CloudinaryService) {}

  @Post()
  @UseInterceptors(FilesInterceptor('photos'))
  async create(
    @UploadedFiles() photos : Express.Multer.File[],
    @Body() body:CreateAddDto,
    @Req() req:any
  ){
   try {
     const userId = await  req.user._id as string
     body.photos = await this.cloudService.upload(photos)
     return this.addsService.create(body, userId);
     } catch(error){
       throw new HttpException(error.message , error.status)
     }
  }
}
