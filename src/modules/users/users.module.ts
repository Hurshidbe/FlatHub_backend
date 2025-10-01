import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.entity';
import { SmsService } from '../sms/sms.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule,
    MongooseModule.forFeature([
    {name : User.name , schema : UserSchema},
  ])],
  controllers: [UsersController],
  providers: [UsersService, SmsService],
})
export class UsersModule {}
