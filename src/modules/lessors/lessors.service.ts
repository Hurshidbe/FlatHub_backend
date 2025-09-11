import { Injectable } from '@nestjs/common';
import { CreateLessorDto } from './dto/create-lessor.dto';
import { UpdateLessorDto } from './dto/update-lessor.dto';

@Injectable()
export class LessorsService {
  create(createLessorDto: CreateLessorDto) {
    return 'This action adds a new lessor';
  }

  findAll() {
    return `This action returns all lessors`;
  }

  findOne(id: number) {
    return `This action returns a #${id} lessor`;
  }

  update(id: number, updateLessorDto: UpdateLessorDto) {
    return `This action updates a #${id} lessor`;
  }

  remove(id: number) {
    return `This action removes a #${id} lessor`;
  }
}
