import { Module } from '@nestjs/common';
import { LessorsService } from './lessors.service';
import { LessorsController } from './lessors.controller';

@Module({
  controllers: [LessorsController],
  providers: [LessorsService],
})
export class LessorsModule {}
