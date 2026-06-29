import { Request } from 'express';
import 'multer';

export function validateFileType(mimetype: RegExp) {
  return {
    fileFilter: (_req: Request, file: Express.Multer.File, callback: Function) => {
      if (mimetype.test(file.mimetype)) {
        callback(null, true);
      } else {
        callback(new Error('Invalid file type'), false);
      }
    },
  };
}

export function validateFileSize(sizeInMB: number) {
  return {
    limits: {
      fileSize: sizeInMB * 1024 * 1024,
    },
  };
}
