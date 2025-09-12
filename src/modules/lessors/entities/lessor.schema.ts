import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { comforts, currency, flatorhouse, for_who, Regions, statuses } from "src/enums/lessor.enums";

export type LessorDocument = Lessor & Document;

@Schema()
export class Lessor {
  @Prop({ type: String, enum: Regions })
  region: Regions;

  @Prop()
  district: string;

  @Prop()
  geolocation: string;

  @Prop({ type: String, enum: flatorhouse })
  flatorhouse: flatorhouse;

  @Prop()
  person_count: number;

  @Prop()
  room_count: number;

  @Prop({ type: [String], enum: for_who })
  for_who: for_who[];

  @Prop({ default: false })
  with_human: boolean;

  @Prop()
  duration: Date;

  @Prop({ type: [String], enum: comforts })
  comforts: comforts[];

  @Prop()
  area: number;

  @Prop([String])
  photos: string[];

  @Prop()
  price: number;

  @Prop({ type: String, enum: currency })
  price_currency: currency;

   @Prop()
  phone: string;

    @Prop()
    telegram : string

   @Prop()
    responsible_person: string

    @Prop()
    extra_info : string

    // must fill with backend

    @Prop({default : statuses.free})
    status : statuses

    @Prop()
    ip_address : string

    @Prop()
    watched : number

    @Prop()
    likes : number

}

export const LessorSchema = SchemaFactory.createForClass(Lessor)