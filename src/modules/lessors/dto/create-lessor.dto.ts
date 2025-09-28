import { IsArray, IsBoolean, IsDateString, IsEnum, IsNumber, IsString } from "class-validator";
import { comforts, currency, flatorhouse, for_who, Regions } from "src/enums/lessor.enums";

export class CreateLessorDto {
  @IsEnum(Regions)
  region: Regions;

  @IsString()
  district: string;

  @IsString()
  geolocation: string;

  @IsEnum(flatorhouse)
  flatorhouse: flatorhouse;

  @IsNumber()
  person_count: number;

  @IsNumber()
  room_count: number;

  @IsEnum(for_who, { each: true })
  for_who: for_who[];

  @IsBoolean()
  with_human: boolean;

  @IsDateString()
  duration: Date;

  @IsArray()
  @IsEnum(comforts, { each: true })
  comforts: comforts[];

  @IsNumber()
  area: number;

  @IsArray()
  @IsString({ each: true })
  photos: string[];

  @IsNumber()
  price: number;

  @IsEnum(currency)
  price_currency: currency;

  @IsString()
  phone: string;

  @IsString()
  telegram: string;

  @IsString()
  responsible_person: string;

  @IsString()
  extra_info: string;

//   @IsString()
//   ip_address: string
}
