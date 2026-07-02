import { Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import 'multer';
import { IFileService } from '../../application/services/file.service.interface';

@Injectable()
export class LocalFileService extends IFileService {
  private readonly baseUrl = process.env.UPLOAD_URL || 'http://localhost:8000';
  private readonly uploadDir = path.join(process.cwd(), 'uploads');

  async uploadFile(
    file: Express.Multer.File,
    folder: string = '',
  ): Promise<{ url: string; key: string }> {
    const subDir = folder ? path.join(this.uploadDir, folder) : this.uploadDir;
    if (!fs.existsSync(subDir)) {
      fs.mkdirSync(subDir, { recursive: true });
    }

    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    const filename = `${uniqueSuffix}${ext}`;
    const relativePath = folder ? `${folder}/${filename}` : filename;
    const absolutePath = path.join(this.uploadDir, relativePath);

    fs.writeFileSync(absolutePath, file.buffer);

    const url = `${this.baseUrl}/uploads/${relativePath.replace(/\\/g, '/')}`;
    return { url, key: relativePath.replace(/\\/g, '/') };
  }

  async deleteFile(key: string): Promise<boolean> {
    try {
      const absolutePath = path.join(this.uploadDir, key);
      if (fs.existsSync(absolutePath)) {
        fs.unlinkSync(absolutePath);
        return true;
      }
      return false;
    } catch {
      return false;
    }
  }
}
