import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { useContainer } from "class-validator";
import mongoose, { DateToString, Mongoose } from "mongoose";
import { comforts, Districts, flatorhouse, for_who, Regions } from "src/enums/lessor.enums";

@Schema()
export class Lessor {
   @Prop({ type: String, enum: Object.values(Regions), required: true })
  region: Regions;

    @Prop()
    district : string

    @Prop()
    location : string

    @Prop()
    flatorhouse : flatorhouse

    @Prop()
    person_count : number // if flat & male/female

    @Prop()
    room_count:number

    @Prop()
    for_who: for_who[]

    @Prop()
    duration : Date

    @Prop()
    comforts: comforts

    @Prop()
    photos : string[]        // max 6

    @Prop()
    price : number //sum

    @Prop()
    phone : string

    @Prop()
    telegram : string

    @Prop()
    owner: string //ref  

    @Prop()
    watched : number

    @Prop()
    likes : number
}

export const LessorSchema = SchemaFactory.createForClass(Lessor)    