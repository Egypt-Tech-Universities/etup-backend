import 'multer';

export abstract class IFileService {
  abstract uploadFile(file: Express.Multer.File, folder?: string): Promise<string>;
  abstract deleteFile(filePath: string): Promise<boolean>;
}
