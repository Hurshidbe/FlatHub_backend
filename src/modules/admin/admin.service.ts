import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Admin, adminDocument } from './entities/admin.entity';
import { Model } from 'mongoose';
import bcrypt from 'bcrypt';
import { User, UserDocument } from '../users/entities/user.entity';
import { Add, AddDocument } from '../adds/entities/add.entity';
import { Mode } from 'fs';
import { Comforts, Flatorhouse, For_who, Regions, rentorsell } from 'src/enums/add.enums';

@Injectable()
export class AdminService {
  constructor(
      @InjectModel(Admin.name) private adminRepo : Model<adminDocument>,
      @InjectModel(User.name) private userRepo : Model<UserDocument>,
      @InjectModel(Add.name) private addRepo : Model<AddDocument>
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
  //////////////////////////////////////////////////////////////// users
  async filterUsers(filters: {
  sex?: string;
  full_name?: string;
  phone?: string;
  is_blocked?: boolean;
  phone_verified?: boolean;
  }) {
  const query: any = {};
  if (filters.sex) query.sex = filters.sex;
  if (filters.is_blocked !== undefined) query.is_blocked = filters.is_blocked;
  if (filters.phone_verified !== undefined) query.phone_verified = filters.phone_verified;
  if (filters.full_name) {
    query.full_name = { $regex: filters.full_name, $options: 'i' };
  }
  if (filters.phone) {
    query.phone = { $regex: filters.phone, $options: 'i' };
  }
  return this.userRepo.find(query).select('-password');
 }

  async findUsers(){
    return this.userRepo.find()
  }

  async findUserById(id : string){
    return this.userRepo.findById(id)
  }

  async blockById(id : string){
    return this.userRepo.findByIdAndUpdate(id, {is_blocked : true}, {new : true})
  }

  async unblockById(id : string){
    return this.userRepo.findByIdAndUpdate(id, {is_blocked : false}, {new : true})
  }

  ////////////////////////////////////////////////////////////////////////////////////// Adds

  async filterAdds(filters: {
    region?: Regions;
    district?: string;
    rentorsale?: rentorsell;
    flatorhouse?: Flatorhouse;
    minPrice?: number;
    maxPrice?: number;
    room_count?: number;
    comforts?: Comforts[];
    for_who?: For_who[];
  }) {
    const query: any = {};

    if (filters.region) query.region = filters.region;
    if (filters.district) query.district = { $regex: filters.district, $options: 'i' };
    if (filters.rentorsale) query.rentorsale = filters.rentorsale;
    if (filters.flatorhouse) query.flatorhouse = filters.flatorhouse;
    if (filters.room_count) query.room_count = filters.room_count;
    if (filters.minPrice || filters.maxPrice) {
      query.price = {};
      if (filters.minPrice) query.price.$gte = +filters.minPrice;
      if (filters.maxPrice) query.price.$lte = +filters.maxPrice;
    }
    if (filters.comforts?.length) query.comforts = { $all: filters.comforts };
    if (filters.for_who?.length) query.for_who = { $in: filters.for_who };

    return this.addRepo.find(query).sort({ createdAt: -1 });
  }
  
  async scamById(id : string){
    return this.addRepo.findByIdAndUpdate(id , {is_scam : true}, {new : true})
  }

   async unscamById(id : string){
    return  this.addRepo.findByIdAndUpdate(id , {is_scam : false}, {new : true})
  }
}
