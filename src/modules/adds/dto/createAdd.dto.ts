import {
  ArrayMaxSize,
  IsArray,
  IsDateString,
  IsEnum,
  IsNotEmpty, IsNumber,
  IsObject,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { comforts, flatorhouse, for_who, Regions, rentorsell } from '../../../enums/add.enums';
import mongoose, { isValidObjectId } from 'mongoose';
import { Transform, Type } from 'class-transformer';


export class CreateAddDto {
  @IsEnum(Regions)
  region: Regions;

  @IsNotEmpty()
  @IsString()
  district: string;

  @IsNotEmpty()
   @Transform(({ value }) => {
    try {
      return typeof value === 'string' ? JSON.parse(value) : value;
    } catch {
      return value;
    }
  })
  location: { lat: number; lng: number };

  @IsNotEmpty()
  @IsEnum(flatorhouse)
  flatorhouse: flatorhouse;

  @IsNotEmpty()
   @Transform(({ value }) => {
    try {
      return typeof value === 'string' ? JSON.parse(value) : value;
    } catch {
      return value;
    }
  })
  floor: { max: number; at: number };

  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  room_count: number;


  @IsNotEmpty()
  @Transform(({ value }) => {
    try {
      return typeof value === 'string' ? JSON.parse(value) : value;
    } catch {
      return value;
    }
  })
  @IsNotEmpty()
  @IsEnum(rentorsell, {each : true})
  rentorsale : string 

  @IsArray()
  @Transform(({ value }) => {
    try {
      return typeof value === 'string' ? JSON.parse(value) : value;
    } catch {
      return value;
    }
  })
  @IsArray()
  @IsEnum(for_who, { each: true })
  for_who: for_who[];

  @IsOptional()
  @IsDateString()
  duration?: Date;

  @IsNotEmpty()
  @Transform(({ value }) => {
    try {
      return typeof value === 'string' ? JSON.parse(value) : value;
    } catch {
      return value;
    }
  })
  @IsEnum(comforts, { each: true })
  comforts: comforts[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @ArrayMaxSize(6)
  photos?: string[];

  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  price: number;


  @IsOptional()
  @IsString()
  @Length(1,255)
  extra_info? : string

  @IsOptional()
  owner?: mongoose.Types.ObjectId;
}
