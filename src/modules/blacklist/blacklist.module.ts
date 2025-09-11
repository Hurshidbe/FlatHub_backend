import { Module } from '@nestjs/common';
import { BlacklistService } from './blacklist.service';
import { BlacklistController } from './blacklist.controller';

@Module({
  controllers: [BlacklistController],
  providers: [BlacklistService],
})
export class BlacklistModule {}
