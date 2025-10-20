import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Comforts, Flatorhouse, For_who, Regions } from "src/enums/add.enums";

@Schema()
export class Add {
  @Prop({ type: String, enum: Object.values(Regions), required: true })
  region: Regions;

  @Prop()
  district : string

  @Prop()
  location: string;

  @Prop()
  rentorsale : string

  @Prop()
  flatorhouse : Flatorhouse

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
  for_who: For_who[]

  @Prop()
  duration : Date

  @Prop()
  comforts: Comforts[]

  @Prop({ type: [String], default: [] })
  photos: string[];     // max 6

  @Prop()
  price : number 

  @Prop({required: false})
  extra_info:string
  ////////////////////////////////////

  @Prop()
  owner: mongoose.Types.ObjectId

  @Prop({default : []})
  reports : string[]

  @Prop({default:0})
  watched : number

  @Prop({default : 0})
  likes : number

  @Prop({default:false})
  is_scam? : boolean

}

export const AddSchema= SchemaFactory.createForClass(Add)

export type AddDocument = Add&Document