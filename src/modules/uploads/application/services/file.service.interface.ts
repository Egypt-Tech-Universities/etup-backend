import 'multer';

export abstract class IFileService {
  abstract uploadFile(
    file: Express.Multer.File,
    folder?: string,
  ): Promise<{ url: string; key: string }>;

  abstract deleteFile(key: string): Promise<boolean>;
}
