  import {
  ArrayMaxSize,
  IsArray,
  IsDateString,
  IsEnum,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { comforts, flatorhouse, for_who, Regions, rentorsell } from '../../../enums/lessor.enums';
import { Transform, Type } from 'class-transformer';

export class UpdateAddDto {
  @IsOptional()
  @IsEnum(Regions)
  region?: Regions;

  @IsOptional()
  @IsString()
  district?: string;

  @IsOptional()
  @Transform(({ value }) => {
    try {
      return typeof value === 'string' ? JSON.parse(value) : value;
    } catch {
      return value;
    }
  })
  @IsObject()
  location?: { lat: number; lng: number };

  @IsOptional()
  @IsEnum(flatorhouse)
  flatorhouse?: flatorhouse;

  @IsOptional()
     @Transform(({ value }) => {
      try {
        return typeof value === 'string' ? JSON.parse(value) : value;
      } catch {
        return value;
      }
    })
  floor: { max: number; at: number };

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  room_count?: number;

  @IsOptional()
  @IsEnum(rentorsell, {each : true})
  rentorsale : string 

  @IsOptional()
  @Transform(({ value }) => {
    try {
      return typeof value === 'string' ? JSON.parse(value) : value;
    } catch {
      return value;
    }
  })
  @IsArray()
  @IsEnum(for_who, { each: true })
  for_who?: for_who[];

  @IsOptional()
  @IsDateString()
  duration?: Date;

  @IsOptional()
  @Transform(({ value }) => {
    try {
      return typeof value === 'string' ? JSON.parse(value) : value;
    } catch {
      return value;
    }
  })
  @IsArray()
  @IsEnum(comforts, { each: true })
  comforts?: comforts[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @ArrayMaxSize(6)
  photos?: string[];

  @IsOptional()
  @IsString()
  photo?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  price?: number;

  

  @IsOptional()
  @IsString()
  @Length(1, 255)
  extra_info?: string;
}
