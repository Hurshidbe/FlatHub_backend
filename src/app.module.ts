import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LessorsModule } from './modules/lessors/lessors.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [LessorsModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
