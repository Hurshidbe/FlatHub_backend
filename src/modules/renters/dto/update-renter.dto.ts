import { PartialType } from '@nestjs/mapped-types';
import { CreateRenterDto } from './create-renter.dto';

export class UpdateRenterDto extends PartialType(CreateRenterDto) {}
