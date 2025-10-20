import {
  BadRequestException,
  Body,
  Controller,
  Delete,
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
import { AiService } from '../ai/ai.service';

@UseGuards(AuthGuard)
@Controller('adds')
export class AddsController {
  constructor(private readonly addsService: AddsService,
              private readonly cloudService : CloudinaryService,
              private readonly ai : AiService) {}

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

  @Patch(':id')
  @UseInterceptors(FilesInterceptor('photos'))
  async  update(
    @UploadedFiles() photos : Express.Multer.File[],
    @Param('id') id : string,
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

  
  @Get(':id')
  async read(@Param('id') id: string, @Req() req: any) {
  try {
    return await this.addsService.findOne(id, req.user.id);
  } catch (error) {
    throw new HttpException(error.message, error.status || 500);
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

  @Post(':id/like')
  async like( @Param('id') id : string) {
    try {
      return this.addsService.like(id);
    } catch (error) {
      throw new HttpException(error.message, error.status )
    }
  }

  @Post(':id/report')
  async report(
  @Param('id') id: string,
  @Req() req: any,
  @Body('message') message: string,
) {
  try {
    return await this.addsService.report(req.user.id, id, message);
  } catch (error) {
    throw new HttpException(error.message, error.status || 400);
  }
}

  @Delete(':id/unlike')
  async unlike(@Param('id') id: string) {
    try {
      return this.addsService.unlike(id);
    } catch (error) {
      throw new HttpException(error.message, error.status )
    }
  }
  
  @Delete(':id')
  async remove(@Param(':id') id : string , @Req() req : any){
    try {
      return this.addsService.deleteOne(id, req.user.id )
    } catch (error) {
      throw new HttpException(error.message , error.status)
    }
  }

  @Post('ai/description')
  async generateDescription (@Body() body : CreateAddDto){
    try {
      return this.ai.generateText(body)
    } catch (error) {
      throw new HttpException(error.message , error.status)
    }
  }
}
