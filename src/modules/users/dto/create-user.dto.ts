import {
  IsBoolean,
  IsEnum,
  isNotEmpty,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
  Length,
  Max,
  Min,
} from 'class-validator';
import { sex } from "src/enums/user.enums";

export class CreateUserDto {
  @IsEnum(sex)
  @IsOptional()
  sex : string;

  @IsNotEmpty()
  @Length(4, 50)
  full_name : string;

  @IsNotEmpty()
  @Length(9)
  phone : string;
    
  @IsNotEmpty()
  @Length(4,36)
  telegram : string;

  @IsNotEmpty()
  @IsStrongPassword({minLength : 6, minNumbers:1})
  password : string;

  @IsNotEmpty()
  repeat_password: string
//////////////////////////////////////////////
  @IsOptional()
  @IsBoolean()
  phone_verified : boolean
}

export class LoginDto {

  @Min(99999999)
  @Max(999999999)
  phone : number;

  @IsNotEmpty()
  @IsStrongPassword({minLength : 6, minNumbers:1})
  password: string;

}
