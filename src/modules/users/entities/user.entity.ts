import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { sex } from "src/enums/user.enums";
import mongoose from 'mongoose';

@Schema()
export class User {
  @Prop()
  sex: sex;

  @Prop()
  full_name: string;

  @Prop()
  phone: string;

  @Prop()
  password: string;

  @Prop()
  telegram: string;

  @Prop({default:"empty"})
  bio : string

  @Prop({ default: false })
  is_blocked: boolean;

  @Prop({ default: false })
  phone_verified: boolean;

  @Prop({type: mongoose.Schema.ObjectId, ref : 'Add'})
  ads: mongoose.Types.ObjectId[]
}

export const UserSchema = SchemaFactory.createForClass(User)
export type  UserDocument = User & Document
