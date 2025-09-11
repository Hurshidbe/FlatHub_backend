import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LessorsModule } from './modules/lessors/lessors.module';
import { RentersModule } from './modules/renters/renters.module';

@Module({
  imports: [LessorsModule, RentersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
