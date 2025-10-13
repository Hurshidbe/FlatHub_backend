import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../users/entities/user.entity';
import { Admin, AdminSchema } from './entities/admin.entity';
import { Add, AddSchema } from '../adds/entities/add.entity';

@Module({
  imports : [
    MongooseModule.forFeature([{ name: Admin.name, schema : AdminSchema },
                               { name : Add.name , schema: AddSchema},
                               { name : User.name , schema : UserSchema}]),
  ],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
