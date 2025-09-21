import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LessorsModule } from './modules/lessors/lessors.module';
import { UsersModule } from './modules/users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import * as dotenv from "dotenv"
dotenv.config()

@Module({
  imports: [MongooseModule.forRoot(process.env.DB_URL || ""),
    LessorsModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
