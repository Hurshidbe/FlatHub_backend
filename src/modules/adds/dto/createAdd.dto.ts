import {
  IsEnum,
  IsNotEmpty, IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { comforts, flatorhouse, for_who, Regions } from '../../../enums/lessor.enums';
import mongoose from 'mongoose';

export class CreateAddDto {
  @IsEnum(Regions)
  region: Regions;

  @IsNotEmpty()
  @IsString()
  district: string;

  @IsNotEmpty()
  location: { lat: number; lng: number };

  @IsNotEmpty()
  @IsEnum(flatorhouse)
  flatorhouse: flatorhouse

  @IsOptional()
  floor? : number[]

  @IsNotEmpty()
  @IsNumber()
  room_count : number

  @IsNotEmpty()
  @IsEnum(for_who, { each: true })
  for_who: for_who[];

  @IsOptional()
  duration? : Date

  @IsNotEmpty()
  @IsEnum(comforts, { each: true })
  comforts: comforts[];


  @IsNotEmpty()
  @IsString({ each: true })
  photos: string[];


  @IsNotEmpty()
  @IsNumber()
  price : number

  @IsString()
  owner : mongoose.Types.ObjectId

}


