import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { roles } from "src/enums/user.enums";

export class CreateAdminDto {

    @IsNotEmpty()
    @IsString()
    username : string

    @IsNotEmpty()
    @IsString()
    password : string

    @IsEnum(roles)
    role? : string
}
