import { diskStorage } from 'multer';
import * as path from 'path';
import * as fs from 'fs';

// أنشئ مجلد uploads الرئيسي
const uploadDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

export const createStorage = (subFolder: string = '') => {
  const destFolder = subFolder ? path.join(uploadDir, subFolder) : uploadDir;

  // أنشئ المجلد الفرعي لو مش موجود
  if (!fs.existsSync(destFolder)) {
    fs.mkdirSync(destFolder, { recursive: true });
  }

  return diskStorage({
    destination: (req, file, cb) => {
      cb(null, destFolder);
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const ext = path.extname(file.originalname);
      cb(null, `${uniqueSuffix}${ext}`);
    },
  });
};
