import { PartialType } from '@nestjs/mapped-types';
import { UserDto } from './user.dto';
import { IsNotEmpty, IsNotEmptyObject, IsOptional, IsStrongPassword, Length } from 'class-validator';
import { sex } from 'src/enums/user.enums';
import { isOptionalChain } from 'typescript';

export class UpdateUserDto extends PartialType(UserDto) {

        @IsOptional()
        @Length(4, 50)
        full_name : string;
    
        @IsOptional()
        @Length(9)
        phone : string;
    
        @IsOptional()
        @Length(4,36)
        telegram : string;

        @IsNotEmpty()
        @Length(0,255)
        bio : string
}
