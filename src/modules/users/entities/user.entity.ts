import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { sex } from "src/enums/user.enums";

@Schema()
export class User {
  @Prop()
  sex: sex;

  @Prop()
  full_name: string;

  @Prop()
  phone: string; // create custom format

  @Prop()
  password: string;

  @Prop()
  telegram: string; // create custom format

  @Prop({ default: false })
  is_blocked: boolean;

  @Prop({ default: false })
  phone_verified: boolean;

  @Prop()
  ads: string; //ref
}

export const UserSchema = SchemaFactory.createForClass(User)
export type  UserDocument = User & Document
