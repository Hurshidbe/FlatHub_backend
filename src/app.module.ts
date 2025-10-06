import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import * as dotenv from "dotenv"
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SmsModule } from './modules/sms/sms.module';
import { SmsService } from './modules/sms/sms.service';
import { HttpModule, HttpService } from '@nestjs/axios';
import { AddsModule } from './modules/adds/adds.module';
dotenv.config()

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal : true , envFilePath : ".env"}),
    MongooseModule.forRoot(process.env.DB_URL || ""),
    UsersModule,
    JwtModule.registerAsync({
      global : true,
      imports : [ConfigModule, HttpModule, UsersModule , SmsModule],
      inject : [ConfigService],
      useFactory:(config_service : ConfigService)=>{
        return {
          secret : config_service.get("JWT"),
          signOptions: {expiresIn: "1h"}
        }
      }
    }),
    SmsModule,
    AddsModule
  ],
  controllers: [AppController],
  providers: [AppService ],
})
export class AppModule {}
