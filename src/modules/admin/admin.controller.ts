import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  BadRequestException,
  HttpException,
  Res,
  Query,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import AuthGuard from 'src/guards/autthGuard';
import { JwtService } from '@nestjs/jwt';
import type { Response } from 'express';
import { Roles } from 'src/interceptors/role.decorator';
import { RoleGuard } from 'src/guards/roleGuard';
import { roles } from 'src/enums/user.enums';
import { Comforts, Flatorhouse, For_who, Regions, rentorsell } from 'src/enums/add.enums';

@Controller('admin')
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private readonly jwtService: JwtService,
  ) {}

  @UseGuards(AuthGuard, RoleGuard)
  @Roles(roles.superadmin)
  @Post()
  async create(@Body() createAdminDto: CreateAdminDto) {
    try {
      const existing = await this.adminService.findByUsername(createAdminDto.username);
      if (existing) throw new BadRequestException('Bunday username allaqachon mavjud');
      return await this.adminService.create(createAdminDto);
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  @Post('login')
  async login(
    @Body() body: { username: string; password: string },
    @Res({ passthrough: true }) res: Response,
  ) {
    const admin = await this.adminService.findByUsername(body.username);
    if (!admin) throw new BadRequestException('admin not found');
    const isPasswordValid = await this.adminService.password_compare(body.password, admin.password);
    if (!isPasswordValid) throw new BadRequestException('incorrect password');

    const payload = { id: admin._id, role: admin.role };
    const token = await this.jwtService.signAsync(payload);
    res.cookie('authToken', token, { httpOnly: true });

    return {
      message: 'success',
      token,
    };
  }

  @UseGuards(AuthGuard ,RoleGuard)
  @Roles(roles.superadmin)
  @Get()
  async findAll() {
   try {
     return await this.adminService.findAll();
   } catch (error) {
    throw new HttpException(error.message , error.status)
   }
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Roles(roles.superadmin)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.adminService.findOne(id);
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Roles(roles.superadmin)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return await this.adminService.update(id, updateAdminDto);
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Roles(roles.superadmin)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.adminService.remove(id);

  }

  @UseGuards(AuthGuard, RoleGuard)
  @Roles(roles.admin, roles.superadmin)
  @Post('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    try {
      res.clearCookie('authToken', { httpOnly: true, path: '/' });
      return { message: 'Logged out successfully' };
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  ////////////////////////////////////////////////////////////////////////////////////// users
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(roles.admin, roles.superadmin)
  @Get('user/filter')
  async filterUsers(
  @Query('sex') sex?: string,
  @Query('full_name') full_name?: string,
  @Query('phone') phone?: string,
  @Query('is_blocked') is_blocked?: string,
  @Query('phone_verified') phone_verified?: string,
) {
  try {
    const filters = {
      sex, full_name, phone,
      is_blocked: is_blocked === 'true',
      phone_verified: phone_verified === 'true',
    };

    return this.adminService.filterUsers(filters);
  } catch (error) {
    throw new HttpException(error.message, error.status || 500);
  }
}


  @UseGuards(AuthGuard, RoleGuard)
  @Roles(roles.admin , roles.superadmin)
  @Get('user')
  async users(){
    try {
      return this.adminService.findUsers()
    } catch (error) {
      throw new HttpException(error.message ,error.status)
    }
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Roles(roles.admin , roles.superadmin)
  @Get(':id/user')
  async user(@Param('id') id : string){
    try {
      return this.adminService.findUserById(id)
    } catch (error) {
      throw new HttpException(error.message , error.status)
    }
  }

  @UseGuards(AuthGuard , RoleGuard)
  @Roles(roles.superadmin , roles.admin)
  @Patch(':id/block')
  async blockUser(@Param('id') id : string){
    try {
      return this.adminService.blockById(id)
    } catch (error) {
      throw new HttpException(error.message , error.status)
    }
  }

  @UseGuards(AuthGuard , RoleGuard)
  @Roles(roles.superadmin , roles.admin)
  @Patch(':id/unblock')
  async unblockUser(@Param('id') id : string){
    try {
      return this.adminService.unblockById(id)
    } catch (error) {
      throw new HttpException(error.message , error.status)
    }
  }
  
//////////////////////////////////////////////////////////////////////////////// Adds

@UseGuards(AuthGuard , RoleGuard)
@Roles(roles.superadmin , roles.admin)
 @Get('add/filter')
  async filterAdds(
    @Query('region') region?: Regions,
    @Query('district') district?: string,
    @Query('rentorsale') rentorsale?: rentorsell,
    @Query('flatorhouse') flatorhouse?: Flatorhouse,
    @Query('minPrice') minPrice?: number,
    @Query('maxPrice') maxPrice?: number,
    @Query('room_count') room_count?: number,
    @Query('comforts') comforts?: string,
    @Query('for_who') for_who?: string,
  ) {
    return this.adminService.filterAdds({
      region,
      district,
      rentorsale,
      flatorhouse,
      minPrice,
      maxPrice,
      room_count,
      comforts: comforts ? comforts.split(',') as Comforts[] : undefined,
      for_who: for_who ? for_who.split(',') as For_who[] : undefined,
    });
  }

  @UseGuards(AuthGuard , RoleGuard)
  @Roles(roles.superadmin , roles.admin)
  @Patch(':id/scam')
  async scamAdd(@Param('id') id : string){
    try {
      return this.adminService.scamById(id)
    } catch (error) {
      throw new HttpException(error.message , error.status)
    }
  }

  @UseGuards(AuthGuard , RoleGuard)
  @Roles(roles.superadmin , roles.admin)
  @Patch(':id/unscam')
  async unscamAdd(@Param('id') id : string){
    try {
      return this.adminService.unscamById(id)
    } catch (error) {
      throw new HttpException(error.message , error.status)
    }
  }

}
