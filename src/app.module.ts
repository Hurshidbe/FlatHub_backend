import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LessorsModule } from './modules/lessors/lessors.module';
import { RentersModule } from './modules/renters/renters.module';
import { LessorsService } from './modules/lessors/lessors.service';
import { MongooseModule } from '@nestjs/mongoose';
import * as dotenv from 'dotenv'
dotenv.config()
@Module({
  imports: [ MongooseModule.forRoot(process.env.DB_URL || ""),
    LessorsModule, RentersModule,
  ],
  controllers: [AppController],
  providers: [AppService, ],
})
export class AppModule {}
