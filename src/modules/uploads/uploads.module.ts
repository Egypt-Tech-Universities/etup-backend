import { Module } from '@nestjs/common';
import { UploadsController } from './presentation/uploads.controller';
import { UploadFileUseCase } from './application/use-cases/upload-file.use-case';
import { IFileService } from './application/services/file.service.interface';
import { LocalFileService } from './infrastructure/storage/local.storage';
import { CloudinaryFileService } from './infrastructure/storage/cloudinary.storage';

const fileServiceProvider = {
  provide: IFileService,
  useClass:
    process.env.STORAGE_DRIVER === 'cloudinary'
      ? CloudinaryFileService
      : LocalFileService,
};

@Module({
  controllers: [UploadsController],
  providers: [fileServiceProvider, UploadFileUseCase],
  exports: [UploadFileUseCase],
})
export class UploadsModule {}
