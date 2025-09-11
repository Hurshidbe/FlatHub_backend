import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { useContainer } from "class-validator";
import mongoose, { DateToString, Mongoose } from "mongoose";
import { comforts, Districts, flatorhouse, for_who, Regions } from "src/enums/lessor.enums";

@Schema()
export class Lessor {
    @Prop({type : Regions})
    region : Regions

    @Prop({type : Districts})
    district : string

    @Prop()
    location : string

    @Prop({type : flatorhouse})
    flatorhouse : flatorhouse

    @Prop()
    person_count : number // if flat & male/female

    @Prop()
    room_count:number

    @Prop({type: [for_who]})
    for_who: for_who[]

    @Prop()
    duration : Date

    @Prop({type : comforts})
    comforts: comforts

    @Prop({type : [String]})
    photos : string[]        // max 6

    @Prop()
    price : number //sum

    @Prop()
    phone : string

    @Prop()
    telegram : string

    @Prop()
    responsible_person: string

    @Prop()
    watched : number

    @Prop()
    likes : number
}

const LessorSchema = SchemaFactory.createForClass(Lessor)