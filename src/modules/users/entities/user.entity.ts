import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { useContainer } from "class-validator";
import { sex } from "src/enums/user.enums";

@Schema()
export class User {
    @Prop()
    sex: sex

    @Prop()
    full_name : string

    @Prop()
    phone: number  // create custom format

    @Prop()
    password_hash : string

    @Prop()
    telegram: string  // create custom format

    @Prop()
    is_blocked : boolean;

    @Prop()
    phone_verified : boolean;

    @Prop()
    ads : string  //ref
}

export const UserSchema = SchemaFactory.createForClass(User)
export type  UserDocument = User & Document
