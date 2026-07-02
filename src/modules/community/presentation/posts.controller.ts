import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import 'multer';
import { CreatePostDto } from '../application/dtos/create-post.dto';
import { UpdatePostDto } from '../application/dtos/update-post.dto';
import { ListPostsDto } from '../application/dtos/list-posts.dto';
import { CreatePostUseCase } from '../application/use-cases/create-post.use-case';
import { ListPostsUseCase } from '../application/use-cases/list-posts.use-case';
import { GetPostUseCase } from '../application/use-cases/get-post.use-case';
import { UpdatePostUseCase } from '../application/use-cases/update-post.use-case';
import { DeletePostUseCase } from '../application/use-cases/delete-post.use-case';
import { TogglePostLikeUseCase } from '../application/use-cases/toggle-post-like.use-case';
import { Public } from '../../../shared/decorators/public.decorator';
import { CurrentUser } from '../../../shared/decorators/current-user.decorator';
import { UserRole } from '../../../shared/enums/user-role.enum';
import { createStorage } from '../../../config/upload.config';
import { UploadFileUseCase } from '../../uploads/application/use-cases/upload-file.use-case';

@ApiTags('Community - Posts')
@Controller('community/posts')
export class PostsController {
  constructor(
    private readonly createUC: CreatePostUseCase,
    private readonly listUC: ListPostsUseCase,
    private readonly getUC: GetPostUseCase,
    private readonly updateUC: UpdatePostUseCase,
    private readonly deleteUC: DeletePostUseCase,
    private readonly toggleLikeUC: TogglePostLikeUseCase,
    private readonly uploadUC: UploadFileUseCase,
  ) {}

  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new post (without images)' })
  create(@Body() dto: CreatePostDto, @CurrentUser('id') userId: string) {
    return this.createUC.execute(dto, userId);
  }

  @Post('with-images')
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Create a new post with images (up to 5)' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        title: { type: 'string', example: 'My new post' },
        content: { type: 'string', example: 'This is the content...' },
        category: {
          type: 'string',
          enum: ['GENERAL', 'ANNOUNCEMENT', 'QUESTION', 'DISCUSSION', 'STUDY_HELP', 'EVENT', 'CAREER', 'ADMISSION', 'REVIEW'],
          example: 'QUESTION',
        },
        tags: {
          type: 'string',
          example: 'admission,nctu,tips',
          description: 'Comma-separated tags',
        },
        universityId: {
          type: 'string',
          format: 'uuid',
          description: 'Optional university ID',
        },
        files: {
          type: 'array',
          items: {
            type: 'string',
            format: 'binary',
          },
          description: 'Up to 5 image files (jpg, png, max 10MB each)',
        },
      },
      required: ['title', 'content'],
    },
  })
  @UseInterceptors(
    FilesInterceptor('files', 5, {
      storage: createStorage(),
      limits: { fileSize: 10 * 1024 * 1024 },
      fileFilter: (req, file, cb) => {
        if (file.mimetype.match(/^image\/(jpe?g|png|gif|webp)$/)) {
          cb(null, true);
        } else {
          cb(new Error('Only image files are allowed'), false);
        }
      },
    }),
  )
  async createWithImages(
    @Body() body: any,
    @UploadedFiles() files: Express.Multer.File[],
    @CurrentUser('id') userId: string,
  ) {
    const dto: CreatePostDto = {
      title: body.title,
      content: body.content,
      category: body.category,
      universityId: body.universityId || undefined,
      tags: body.tags ? body.tags.split(',').map((t: string) => t.trim()) : [],
      imageUrls: [],
    };

    if (files && files.length > 0) {
      const uploadPromises = files.map((file) =>
        this.uploadUC.execute(file, 'posts'),
      );
      const results = await Promise.all(uploadPromises);
      dto.imageUrls = results.map((r) => r.url);
    }

    return this.createUC.execute(dto, userId);
  }

  @Public()
  @Get()
  @ApiOperation({ summary: 'List all posts (paginated, filterable)' })
  async list(@Query() query: ListPostsDto) {
    const { data, total } = await this.listUC.execute(query);
    const page = query.page ?? 1;
    const limit = query.limit ?? 10;
    return {
      data,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    };
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Get a single post (also increments views)' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.getUC.execute(id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a post (author or admin)' })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdatePostDto,
    @CurrentUser('id') userId: string,
    @CurrentUser('role') role: UserRole,
  ) {
    return this.updateUC.execute(id, dto, userId, role);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a post (author or admin)' })
  remove(
    @Param('id', ParseUUIDPipe) id: string,
    @CurrentUser('id') userId: string,
    @CurrentUser('role') role: UserRole,
  ) {
    return this.deleteUC.execute(id, userId, role);
  }

  @Post(':id/like')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Toggle like on a post' })
  toggleLike(
    @Param('id', ParseUUIDPipe) id: string,
    @CurrentUser('id') userId: string,
  ) {
    return this.toggleLikeUC.execute(userId, id);
  }
}
