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
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateCommentDto } from '../application/dtos/create-comment.dto';
import { UpdateCommentDto } from '../application/dtos/update-comment.dto';
import { CreateCommentUseCase } from '../application/use-cases/create-comment.use-case';
import { ListCommentsUseCase } from '../application/use-cases/list-comments.use-case';
import { UpdateCommentUseCase } from '../application/use-cases/update-comment.use-case';
import { DeleteCommentUseCase } from '../application/use-cases/delete-comment.use-case';
import { ToggleCommentLikeUseCase } from '../application/use-cases/toggle-comment-like.use-case';
import { Public } from '../../../shared/decorators/public.decorator';
import { CurrentUser } from '../../../shared/decorators/current-user.decorator';
import { UserRole } from '../../../shared/enums/user-role.enum';
import { PaginationDto } from '../../../shared/dto/pagination.dto';

@ApiTags('Community - Comments')
@Controller('community')
export class CommentsController {
  constructor(
    private readonly createUC: CreateCommentUseCase,
    private readonly listUC: ListCommentsUseCase,
    private readonly updateUC: UpdateCommentUseCase,
    private readonly deleteUC: DeleteCommentUseCase,
    private readonly toggleLikeUC: ToggleCommentLikeUseCase,
  ) {}

  @Post('posts/:postId/comments')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Add a comment to a post (or reply if parentId set)' })
  create(
    @Param('postId', ParseUUIDPipe) postId: string,
    @Body() dto: CreateCommentDto,
    @CurrentUser('id') userId: string,
  ) {
    return this.createUC.execute(postId, dto, userId);
  }

  @Public()
  @Get('posts/:postId/comments')
  @ApiOperation({ summary: 'List comments of a post' })
  async list(
    @Param('postId', ParseUUIDPipe) postId: string,
    @Query() query: PaginationDto,
  ) {
    const page = query.page ?? 1;
    const limit = query.limit ?? 10;
    const { data, total } = await this.listUC.execute(postId, page, limit);
    return {
      data,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    };
  }

  @Patch('comments/:id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a comment' })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateCommentDto,
    @CurrentUser('id') userId: string,
    @CurrentUser('role') role: UserRole,
  ) {
    return this.updateUC.execute(id, dto.content, userId, role);
  }

  @Delete('comments/:id')
  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a comment' })
  remove(
    @Param('id', ParseUUIDPipe) id: string,
    @CurrentUser('id') userId: string,
    @CurrentUser('role') role: UserRole,
  ) {
    return this.deleteUC.execute(id, userId, role);
  }

  @Post('comments/:id/like')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Toggle like on a comment' })
  toggleLike(
    @Param('id', ParseUUIDPipe) id: string,
    @CurrentUser('id') userId: string,
  ) {
    return this.toggleLikeUC.execute(userId, id);
  }
}
