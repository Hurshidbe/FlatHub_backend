import { Injectable } from '@nestjs/common';
import { CreateRenterDto } from './dto/create-renter.dto';
import { UpdateRenterDto } from './dto/update-renter.dto';

@Injectable()
export class RentersService {
  create(createRenterDto: CreateRenterDto) {
    return 'This action adds a new renter';
  }

  findAll() {
    return `This action returns all renters`;
  }

  findOne(id: number) {
    return `This action returns a #${id} renter`;
  }

  update(id: number, updateRenterDto: UpdateRenterDto) {
    return `This action updates a #${id} renter`;
  }

  remove(id: number) {
    return `This action removes a #${id} renter`;
  }
}
