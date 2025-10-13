import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Admin, adminDocument } from './entities/admin.entity';
import { Model } from 'mongoose';
import bcrypt from 'bcrypt';

@Injectable()
export class AdminService {
  constructor(
      @InjectModel(Admin.name) private adminRepo : Model<adminDocument>
  ){}
  
 async create(dto: CreateAdminDto) {
   dto.password = await bcrypt.hash(dto.password, 12);
   return this.adminRepo.create(dto);
 }

  async findByUsername(username: string) {
    return this.adminRepo.findOne({ username });
  }

  async password_compare(inputPassword: string, hashed_password: string) {
    return bcrypt.compare(inputPassword, hashed_password);
  }

  async findAll() {
    return this.adminRepo.find();
  }

  async findOne(id: string) {
   return this.adminRepo.findById(id);
    
  }

  async update(id: string, dto: UpdateAdminDto) {
    return this.adminRepo.findByIdAndUpdate(id, dto, { new: true });
    
  }

  async remove(id: string) {
    return this.adminRepo.findByIdAndDelete(id);
  
  }
}
