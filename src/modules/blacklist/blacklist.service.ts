import { Injectable } from '@nestjs/common';
import { CreateBlacklistDto } from './dto/create-blacklist.dto';
import { UpdateBlacklistDto } from './dto/update-blacklist.dto';

@Injectable()
export class BlacklistService {
  create(createBlacklistDto: CreateBlacklistDto) {
    return 'This action adds a new blacklist';
  }

  findAll() {
    return `This action returns all blacklist`;
  }

  findOne(id: number) {
    return `This action returns a #${id} blacklist`;
  }

  update(id: number, updateBlacklistDto: UpdateBlacklistDto) {
    return `This action updates a #${id} blacklist`;
  }

  remove(id: number) {
    return `This action removes a #${id} blacklist`;
  }
}
