import { Module } from '@nestjs/common';
import { RentersService } from './renters.service';
import { RentersController } from './renters.controller';

@Module({
  controllers: [RentersController],
  providers: [RentersService],
})
export class RentersModule {}
