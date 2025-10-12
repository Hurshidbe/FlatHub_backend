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
import mongoose, { isValidObjectId } from 'mongoose';
import { Transform, Type } from 'class-transformer';
import { Comforts, Flatorhouse, For_who, Regions, rentorsell } from 'src/enums/add.enums';


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
  @IsEnum(Flatorhouse)
  flatorhouse: Flatorhouse;

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
  @IsEnum(For_who, { each: true })
  for_who: For_who[];

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
  @IsEnum(Comforts, { each: true })
  comforts: Comforts[];

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

export class ReportDto {
  userId : string
  message : string
}