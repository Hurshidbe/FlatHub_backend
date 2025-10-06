import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { useContainer } from "class-validator";
import mongoose, { DateToString, Model, Mongoose } from 'mongoose';
import { comforts, Districts, flatorhouse, for_who, Regions } from "src/enums/lessor.enums";
import { User } from '../../users/entities/user.entity';

class Location {
  @Prop({ required: true })
  lat: number;

  @Prop({ required: true })
  lng: number;
}


@Schema()
export class Add {
  @Prop({ type: String, enum: Object.values(Regions), required: true })
  region: Regions;

  @Prop()
  district: string;

  @Prop()
  location: Location;


@Prop()
  flatorhouse: flatorhouse;

  @Prop({
    required: function () {
      return this.flatorhouse === 'flat';
    },
  })
  floor: number[];

  @Prop()
  room_count: number;

  @Prop()
  for_who: for_who[];

  @Prop()
  duration: Date;

  @Prop({ default: '' })
  comforts: comforts[];

  @Prop()
  photos: string[];

  @Prop()
  price: number;

  @Prop({ type: mongoose.Schema.ObjectId, ref: 'User' })
  owner: mongoose.Types.ObjectId | User;
  ///////////////////////////////////////////////////////////////
  @Prop({ default: 0 })
  watched: number;

  @Prop({ default: 0 })
  likes: number;

  @Prop({default : 0})
  dislikes : number
}

export const AddSchema= SchemaFactory.createForClass(Add)
export type  AddDocument = Add & Document