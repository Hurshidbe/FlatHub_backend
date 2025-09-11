import { PartialType } from '@nestjs/mapped-types';
import { CreateBlacklistDto } from './create-blacklist.dto';

export class UpdateBlacklistDto extends PartialType(CreateBlacklistDto) {}
