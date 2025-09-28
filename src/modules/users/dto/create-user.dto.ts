import { IsEnum, isNotEmpty, IsNotEmpty, IsString, IsStrongPassword, Length } from "class-validator";
import { sex } from "src/enums/user.enums";

export class CreateUserDto {
    @IsEnum(sex)
    @IsNotEmpty()
    sex : string;

    @IsNotEmpty()
    @Length(4, 50)
    full_name : string;

    @Length(9)
    @IsNotEmpty()
    phone : number;
    
    @IsNotEmpty()
    @Length(4,36)
    telegram : string;
    
    @IsNotEmpty()
    @IsStrongPassword({minLength : 6, minNumbers:1})
    password : string;

    @IsNotEmpty()
    repeat_password: string

}
