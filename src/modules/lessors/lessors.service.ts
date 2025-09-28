import { Injectable } from '@nestjs/common';
import { CreateLessorDto } from './dto/create-lessor.dto';
import { UpdateLessorDto } from './dto/update-lessor.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Lessor } from './entities/lessor.schema';
import { Model } from 'mongoose';

@Injectable()
export class LessorsService {
constructor(
  @InjectModel(Lessor.name ) private LessorsRepo : Model<Lessor>
){}

  async create(createLessorDto: CreateLessorDto) {
    return this.LessorsRepo.create(createLessorDto)
   
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

  async ipFinder (){}
}
