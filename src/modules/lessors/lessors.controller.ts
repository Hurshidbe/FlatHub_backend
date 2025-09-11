import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LessorsService } from './lessors.service';
import { CreateLessorDto } from './dto/create-lessor.dto';
import { UpdateLessorDto } from './dto/update-lessor.dto';

@Controller('lessors')
export class LessorsController {
  constructor(private readonly lessorsService: LessorsService) {}

  @Post()
  create(@Body() createLessorDto: CreateLessorDto) {
    return this.lessorsService.create(createLessorDto);
  }

  @Get()
  findAll() {
    return this.lessorsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lessorsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLessorDto: UpdateLessorDto) {
    return this.lessorsService.update(+id, updateLessorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lessorsService.remove(+id);
  }
}
