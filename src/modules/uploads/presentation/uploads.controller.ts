import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import 'multer';
import { UploadFileUseCase } from '../application/use-cases/upload-file.use-case';
import { createStorage } from '../../../config/upload.config';

@ApiTags('Uploads')
@ApiBearerAuth()
@Controller('uploads')
export class UploadsController {
  constructor(private readonly uploadUC: UploadFileUseCase) {}

  @Post('avatar')
  @ApiOperation({ summary: 'Upload user avatar image (max 5MB)' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
          description: 'Avatar image (jpg, png)',
        },
      },
    },
  })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: createStorage(),
      limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
      fileFilter: (req, file, cb) => {
        if (file.mimetype.match(/^image\/(jpe?g|png)$/)) {
          cb(null, true);
        } else {
          cb(new Error('Only JPG and PNG images are allowed'), false);
        }
      },
    }),
  )
  async uploadAvatar(@UploadedFile() file: Express.Multer.File) {
    return this.uploadUC.execute(file, 'avatars');
  }

  @Post('university-logo')
  @ApiOperation({ summary: 'Upload university logo (max 5MB)' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
          description: 'Logo image (jpg, png)',
        },
      },
    },
  })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: createStorage(),
      limits: { fileSize: 5 * 1024 * 1024 },
      fileFilter: (req, file, cb) => {
        if (file.mimetype.match(/^image\/(jpe?g|png)$/)) {
          cb(null, true);
        } else {
          cb(new Error('Only JPG and PNG images are allowed'), false);
        }
      },
    }),
  )
  async uploadUniversityLogo(@UploadedFile() file: Express.Multer.File) {
    return this.uploadUC.execute(file, 'universities');
  }

  @Post('post-image')
  @ApiOperation({ summary: 'Upload image for community post (max 10MB)' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
          description: 'Post image (jpg, png, gif, webp)',
        },
      },
    },
  })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: createStorage(),
      limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
      fileFilter: (req, file, cb) => {
        if (file.mimetype.match(/^image\/(jpe?g|png|gif|webp)$/)) {
          cb(null, true);
        } else {
          cb(new Error('Only image files are allowed'), false);
        }
      },
    }),
  )
  async uploadPostImage(@UploadedFile() file: Express.Multer.File) {
    return this.uploadUC.execute(file, 'posts');
  }

  @Post('university-gallery')
  @ApiOperation({ summary: 'Upload image for university gallery (max 10MB)' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
          description: 'Gallery image (jpg, png, gif, webp)',
        },
      },
    },
  })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: createStorage(),
      limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
      fileFilter: (req, file, cb) => {
        if (file.mimetype.match(/^image\/(jpe?g|png|gif|webp)$/)) {
          cb(null, true);
        } else {
          cb(new Error('Only image files are allowed'), false);
        }
      },
    }),
  )
  async uploadUniversityGallery(@UploadedFile() file: Express.Multer.File) {
    return this.uploadUC.execute(file, 'universities/gallery');
  }

  @Post('leadership-image')
  @ApiOperation({ summary: 'Upload leadership member image (max 5MB)' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
          description: 'Leadership image (jpg, png)',
        },
      },
    },
  })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: createStorage(),
      limits: { fileSize: 5 * 1024 * 1024 },
      fileFilter: (req, file, cb) => {
        if (file.mimetype.match(/^image\/(jpe?g|png)$/)) {
          cb(null, true);
        } else {
          cb(new Error('Only JPG and PNG images are allowed'), false);
        }
      },
    }),
  )
  async uploadLeadershipImage(@UploadedFile() file: Express.Multer.File) {
    return this.uploadUC.execute(file, 'universities/leadership');
  }
}
