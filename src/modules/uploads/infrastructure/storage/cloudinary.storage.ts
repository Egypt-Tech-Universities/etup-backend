import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import 'multer';
import { IFileService } from '../../application/services/file.service.interface';

@Injectable()
export class CloudinaryFileService extends IFileService {
  constructor() {
    super();
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  }

  async uploadFile(
    file: Express.Multer.File,
    folder: string = '',
  ): Promise<{ url: string; key: string }> {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder,
          resource_type: 'image',
        },
        (error, result) => {
          if (error) return reject(error);
          resolve({
            url: result!.secure_url,
            key: result!.public_id,
          });
        },
      );
      uploadStream.end(file.buffer);
    });
  }

  async deleteFile(key: string): Promise<boolean> {
    try {
      const result = await cloudinary.uploader.destroy(key);
      return result.result === 'ok';
    } catch {
      return false;
    }
  }
}
