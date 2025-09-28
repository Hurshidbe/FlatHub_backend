import { Module } from '@nestjs/common';
import { LessorsService } from './lessors.service';
import { LessorsController } from './lessors.controller';
import { MongooseModule } from '@nestjs/mongoose';
<<<<<<< HEAD
import { Lessor, LessorSchema } from './entities/lessor.entity';
import { User, UserSchema } from '../users/entities/user.entity';

@Module({
  imports : [
    MongooseModule.forFeature([
      { name: Lessor.name, schema: LessorSchema },
    ]),
=======
import { Lessor, LessorSchema } from './entities/lessor.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{name : Lessor.name , schema: LessorSchema}])
>>>>>>> master
  ],
  controllers: [LessorsController],
  providers: [LessorsService],
})
export class LessorsModule {}
