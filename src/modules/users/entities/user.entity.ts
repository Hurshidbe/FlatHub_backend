import { Prop, Schema } from "@nestjs/mongoose";
import { sex } from "src/enums/user.enums";

@Schema()
export class User {
    @Prop()
    sex: sex

    @Prop()
    full_name : string

    @Prop()
    phone: string  // create custom format

    @Prop()
    password_hash : string
    
    @Prop()
    is_blocked : boolean;

    @Prop()
    tg_username : string  // create custom format

    @Prop()
    ads : {}  //ref

}
