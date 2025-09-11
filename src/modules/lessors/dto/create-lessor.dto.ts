import { IsArray, IsBoolean, IsDate, IsDateString, IsEnum, IsNumber, isString, IsString } from "class-validator"
import { comforts, currency, flatorhouse, for_who, Regions } from "src/enums/lessor.enums"
import { isatty } from "tty"

export class CreateLessorDto {
    @IsString()
    @IsEnum(Regions)
    region : Regions

    @IsString()
    district : string

    @IsString()
    geolocation : string 

    @IsEnum(flatorhouse)
    flatorhouse : flatorhouse

    @IsNumber()
    person_count : number 

    @IsNumber()
    room_count:number

    @IsEnum(for_who, {each : true})
    for_who: for_who[]

    @IsBoolean()
    with_human : boolean

    @IsDate()
    duration : Date

    @IsArray()
    @IsEnum(comforts , {each : true})
    comforts: comforts[]

    @IsNumber()
    area : number // m/square

    @IsArray()
    @IsString({each : true})
    photos : string[]        // max 6

    @IsNumber()
    price : number //sum

    @IsEnum(currency)
    price_currency : currency

    @IsString()
    phone : string

    @IsString()
    telegram : string

    @IsString()
    responsible_person: string

    @IsString()
    extra_info : string

}
