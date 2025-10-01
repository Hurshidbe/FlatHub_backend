import { Module } from '@nestjs/common';
import { SmsService } from './sms.service';
import { HttpModule } from '@nestjs/axios';
import * as dotenv from 'dotenv'
dotenv.config()
@Module({
  imports : [
    HttpModule.register({
      baseURL : "https://notify.eskiz.uz/api/" ,
      headers: {
        'Authorization': `Bearer ${process.env.SMS_TOKEN}`,
        'Content-Type': 'application/json'
      }
    })
  ],
  controllers: [],
  providers: [SmsService],
  exports : [SmsService]
})
export class SmsModule {}
