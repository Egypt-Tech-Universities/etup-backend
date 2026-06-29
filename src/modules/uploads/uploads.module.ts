import { Module } from '@nestjs/common';
import { UploadsController } from './presentation/uploads.controller';
import { UploadFileUseCase } from './application/use-cases/upload-file.use-case';
import { IFileService } from './application/services/file.service.interface';
import { LocalFileService } from './infrastructure/storage/local.storage';

@Module({
  controllers: [UploadsController],
  providers: [
    {
      provide: IFileService,
      useClass: LocalFileService,
    },
    UploadFileUseCase,
  ],
  exports: [UploadFileUseCase],
})
export class UploadsModule {}
