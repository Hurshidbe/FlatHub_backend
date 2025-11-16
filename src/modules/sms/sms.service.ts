import { firstValueFrom } from 'rxjs';
import { BadRequestException, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class SmsService {
  constructor(private readonly httpService: HttpService) {}

  async sendSms(phone: string, message: string) {
    const body = {
      mobile_phone: phone,
      message,
      from: process.env.SMS_FROM
    };
    try {
      const res = await firstValueFrom(
        this.httpService.post(
          'https://notify.eskiz.uz/api/message/sms/send',
          body,
          {
            headers: {
              Authorization: `Bearer ${process.env.SMS_TOKEN}`, 
              'Content-Type': 'application/json',
            },
          },
        ),
      );
      return res.data;
    } catch (err) {
      throw new BadRequestException(
        err.response?.data?.message || 'SMS yuborishda xato',
      );
    }
  }
}
