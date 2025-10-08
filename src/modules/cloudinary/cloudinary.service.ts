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
    try {
      if (!photos || photos.length === 0) return [];
      if (photos.length > 6)
        throw new BadRequestException('you can upload maximum 6 photos');

      const urls: string[] = [];

      for (const photo of photos) {
        const result = await this.uploadToCloudinary(photo);
        urls.push(result.secure_url);
      }

      return urls;
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, 500);
    }
  }

  private async uploadToCloudinary(file: Express.Multer.File): Promise<any> {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: 'flatHub' },
      (error, result) => {
        if (error) {
          console.error('Cloudinary error:', error);
          reject(error);
        } else {
          resolve(result);
        }
      },
    );
    const readableFile = Readable.from(file.buffer);
    readableFile.pipe(stream);
  });
}

}
