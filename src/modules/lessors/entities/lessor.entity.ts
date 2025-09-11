import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { useContainer } from "class-validator";
import mongoose, { DateToString, Mongoose } from "mongoose";
import { comforts, currency, Districts, flatorhouse, for_who, Regions,  statuses } from "src/enums/lessor.enums";

@Schema()
export class Lessor {
    @Prop({type : Regions})
    region : Regions

    @Prop({type : Districts})
    district : string

    @Prop()
    geolocation : string // integration with google/yandex maps

    @Prop({type : flatorhouse})
    flatorhouse : flatorhouse

    @Prop()
    person_count : number // if flat & male/female

    @Prop()
    room_count:number

    @Prop({type: [for_who]})
    for_who: for_who[]

    @Prop({default : false})
    with_human : boolean

    @Prop()
    duration : Date

    @Prop({type : comforts})
    comforts: comforts

    @Prop()
    area : number // m/square

    @Prop({type : [String]})
    photos : string[]        // max 6

    @Prop()
    price : number //sum

    @Prop({type : currency})
    price_currency : currency

    @Prop()
    phone : string

    @Prop()
    telegram : string

    @Prop()
    responsible_person: string

    @Prop()
    extra_info : string

    @Prop()
    status : statuses

    @Prop()
    ip_address : string

    @Prop()
    watched : number

    @Prop()
    likes : number

}

const LessorSchema = SchemaFactory.createForClass(Lessor)