import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { comforts, Districts, flatorhouse, for_who,  Regions, rentorsell } from "src/enums/lessor.enums";

@Schema()
export class Add {
  @Prop({ type: String, enum: Object.values(Regions), required: true })
  region: Regions;

  @Prop()
  district : string

  @Prop({
  type: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
     },
    required: true,
  })
  location: {lat : number , lng: number};

  @Prop()
  rentorsale : string

  @Prop()
  flatorhouse : flatorhouse

 @Prop({
  type: {
    max: { type: Number, required: true },
    at: { type: Number, required: true },
     },
    required: true,
  })
  floor: {max : number , at: number};

  @Prop()
  room_count:number

  @Prop()
  for_who: for_who[]

  @Prop()
  duration : Date

  @Prop()
  comforts: comforts[]

 @Prop({ type: [String], default: [] })
  photos: string[];     // max 6

  @Prop()
  price : number 

  @Prop({required: false})
  extra_info:string
  ////////////////////////////////////

  @Prop()
  owner: mongoose.Types.ObjectId

  @Prop()
  watched : number

  @Prop()
  likes : number
}

export const AddSchema= SchemaFactory.createForClass(Add)

export type AddDocument = Add&Document