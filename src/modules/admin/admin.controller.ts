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

@Controller('admin')
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private readonly jwtService: JwtService,
  ) {}

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

  @UseGuards(AuthGuard)
  @Roles(roles.superadmin)
  @Get()
  async findAll() {
   try {
     return await this.adminService.findAll();
   } catch (error) {
    throw new HttpException(error.message , error.status)
   }
  }

  @UseGuards(AuthGuard)
  @Roles(roles.superadmin)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.adminService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Roles(roles.superadmin)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return await this.adminService.update(id, updateAdminDto);
  }

  @UseGuards(AuthGuard)
  @Roles(roles.superadmin)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.adminService.remove(id);

  }

  @UseGuards(AuthGuard)
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
}
