import { PartialType } from '@nestjs/mapped-types';
import { CreateLessorDto } from './create-lessor.dto';

export class UpdateLessorDto extends PartialType(CreateLessorDto) {}
