import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LessorsModule } from './modules/lessors/lessors.module';
import { UsersModule } from './modules/users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import * as dotenv from "dotenv"
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from 'nestjs-config';
dotenv.config()

@Module({
  imports: [
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
