import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { roles } from "src/enums/user.enums";

@Schema()
export class Admin {

    @Prop({unique : true})
    username: string

    @Prop()
    password : string

    @Prop({default: roles.admin})
    role?: string
}

export const AdminSchema = SchemaFactory.createForClass(Admin)

export type  adminDocument = Admin & Document
