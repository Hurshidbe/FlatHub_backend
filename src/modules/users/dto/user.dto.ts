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

export class UserDto {
  @IsEnum(sex, {each : true})
  @IsNotEmpty()
  sex : sex;

  @IsNotEmpty()
  @Length(4, 50)
  full_name : string;

  @IsNotEmpty()
  @Length(9)
  phone : string;
    
  @IsNotEmpty()
  @Length(4,36)
  telegram : string;

  @IsOptional()
  @IsString()
  @Length(0, 255)
  bio? : string

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

  @Length(9)
  phone : string;

  @IsNotEmpty()
  password: string;

}




export class ChangePasswordDto {
  @IsNotEmpty()
  oldPassword: string;

  @IsNotEmpty()
  @IsStrongPassword({minLength : 6, minNumbers:1})
  newPassword: string;

  @IsNotEmpty()
  @IsStrongPassword({minLength : 6, minNumbers:1})
  reNewPassword: string;
}