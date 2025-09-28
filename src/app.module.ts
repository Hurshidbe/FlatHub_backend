import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LessorsModule } from './modules/lessors/lessors.module';
<<<<<<< HEAD
import { UsersModule } from './modules/users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import * as dotenv from "dotenv"
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
dotenv.config()

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal : true , envFilePath : ".env"}),
    MongooseModule.forRoot(process.env.DB_URL || ""),
    LessorsModule, 
    UsersModule,
    JwtModule.registerAsync({
      global : true,
      imports : [ConfigModule],
      inject : [ConfigService],
      useFactory:(config_service : ConfigService)=>{
        return {
          secret : config_service.get("JWT"),
          signOptions: {expiresIn: "1h"}
        }
      }
    })
=======
import { RentersModule } from './modules/renters/renters.module';
import { LessorsService } from './modules/lessors/lessors.service';
import { MongooseModule } from '@nestjs/mongoose';
import * as dotenv from 'dotenv'
dotenv.config()
@Module({
  imports: [ MongooseModule.forRoot(process.env.DB_URL || ""),
    LessorsModule, RentersModule,
>>>>>>> master
  ],
  controllers: [AppController],
  providers: [AppService, ],
})
export class AppModule {}
