import { Injectable } from '@nestjs/common';
import 'multer';
import { IFileService } from '../services/file.service.interface';

@Injectable()
export class UploadFileUseCase {
  constructor(private readonly fileService: IFileService) {}

  async execute(
    file: Express.Multer.File,
    folder: string = '',
  ): Promise<{ url: string }> {
    const url = await this.fileService.uploadFile(file, folder);
    return { url };
  }
}
