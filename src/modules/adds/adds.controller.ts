import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  Patch,
  Post,
  Query,
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
import { parseArgs } from 'node:util';
import mongoose from 'mongoose';
import { UpdateAddDto } from './dto/updateAdd.dto';
import { error } from 'node:console';

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
     const userId = await  req.user.id as string
     body.photos = await this.cloudService.upload(photos)
     return this.addsService.create(body, userId);
     } catch(error){
      console.log(error)
       throw new HttpException(error.message , error.status)
     }
  }

  @Patch()
  @UseInterceptors(FilesInterceptor('photos'))
  async  update(
    @Query('id') id : string,
    @UploadedFiles() photos : Express.Multer.File[],
    @Body() body : UpdateAddDto,
    @Req() req : any
  ){
   try {
     if(mongoose.isValidObjectId(id)){
       const  userId = req.user.id
       if(photos?.length)
       body.photos = await  this.cloudService.upload(photos)
       if (body.photo) {
         body.photos = body.photos || [];
         body.photos.push(body.photo);
       }
       return this.addsService.update(id , body, userId)
     }
   }catch (error) {
     throw  new HttpException(error.message , error.status)
   }
  }

  
  @Get()
  async read(@Query('id') id : string, @Req() req : any){
    try {
      return await this.addsService.findOne(id, req.user.id)
    } catch (error) {
      throw new HttpException(error.message , error.status
      )
    }
  }

  @Get('all')
  async all(@Req() req : any){
    try {
      return this.addsService.getAll(req.user.id)
    } catch (error) {
      throw new HttpException(error.message , error.status)
    }
  }
}
