import { Injectable, BadRequestException, HttpException } from '@nestjs/common';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { v2 as cloudinary } from 'cloudinary';
import { memoryStorage } from 'multer';
import { Readable } from 'stream';

export const multerOptions: MulterOptions = {
  storage: memoryStorage(),
};

@Injectable()
export class CloudinaryService {
  constructor() {
    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME || '',
      api_key: process.env.CLOUD_KEY || '',
      api_secret: process.env.CLOUD_SECRET || '',
    });
  }

  async upload(photos: Express.Multer.File[]): Promise<string[]> {
    if (!photos || photos.length === 0) {
      return [];
    }

    if (photos.length > 6) {
      throw new BadRequestException('photos count must not be more than 6');
    }

    try {
      const urls: string[] = [];

      for (const photo of photos) {
        const result = await this.uploadToCloudinary(photo);
        urls.push(result.secure_url);
      }

      return urls;
    } catch (error) {
      throw new HttpException(error.message || 'Failed to upload images', 500);
    }
  }

 private async uploadToCloudinary(file: Express.Multer.File): Promise<any> {
  return new Promise((resolve, reject) => {
    const allowedFormats = ['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/jpg'];
    if (!allowedFormats.includes(file.mimetype)) {
      reject(new BadRequestException('Only JPG, PNG, WEBP or HEIC formats are allowed'));
      return;
    }

    if (file.size > 5*1024*1024) {
      reject(new BadRequestException('Each photo must be <= 5MB'));
      return;
    }
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: 'flatHub',
        transformation: [
          {
            quality: 'auto',
            fetch_format: 'auto',
          },
        ],
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      },
    );

    Readable.from(file.buffer).pipe(stream);
  });
}

}