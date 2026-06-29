import { Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import 'multer';
import { IFileService } from '../../application/services/file.service.interface';

@Injectable()
export class LocalFileService extends IFileService {
  private readonly baseUrl = process.env.UPLOAD_URL || 'http://localhost:3000';

  async uploadFile(file: Express.Multer.File, folder: string = ''): Promise<string> {
    // Multer حفظ الملف تلقائيًا في المكان المحدد
    // فقط نحول المسار لـ URL
    
    const relativePath = file.path
      .replace(process.cwd(), '')
      .replace(/\\/g, '/') // Windows paths
      .replace(/^\//, ''); // Remove leading slash
    
    return `${this.baseUrl}/${relativePath}`;
  }

  async deleteFile(filePath: string): Promise<boolean> {
    try {
      const url = new URL(filePath);
      const relativePath = url.pathname.substring(1);
      const absolutePath = path.join(process.cwd(), relativePath);
      
      if (fs.existsSync(absolutePath)) {
        fs.unlinkSync(absolutePath);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error deleting file:', error);
      return false;
    }
  }
}
