import {
  Body,
  Controller,
  HttpException,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AddsService } from './adds.service';
import { CreateAddDto } from './dto/createAdd.dto';
import AuthGuard from '../../guards/autthGuard';

@UseGuards(AuthGuard)
@Controller('adds')
export class AddsController {
  constructor(private readonly addsService: AddsService) {}

  @Post()
  async create(@Body() body:CreateAddDto, @Req() req:any){
   try {
     const userId = await  req.user._id as string
     return this.addsService.create(body, userId);
     } catch(error){
       throw new HttpException(error.message , error.status)
     }
  }
}
