import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Post } from './domain/entities/post.entity';
import { Comment } from './domain/entities/comment.entity';
import { Like } from './domain/entities/like.entity';
import { Report } from './domain/entities/report.entity';
import { User } from '../users/domain/entities/user.entity';

import { PostsController } from './presentation/posts.controller';
import { CommentsController } from './presentation/comments.controller';
import { ReportsController } from './presentation/reports.controller';

import { PostRepository } from './application/repositories/post.repository';
import { CommentRepository } from './application/repositories/comment.repository';
import { LikeRepository } from './application/repositories/like.repository';
import { ReportRepository } from './application/repositories/report.repository';

import { TypeOrmPostRepository } from './infrastructure/repositories/typeorm-post.repository';
import { TypeOrmCommentRepository } from './infrastructure/repositories/typeorm-comment.repository';
import { TypeOrmLikeRepository } from './infrastructure/repositories/typeorm-like.repository';
import { TypeOrmReportRepository } from './infrastructure/repositories/typeorm-report.repository';

import { CreatePostUseCase } from './application/use-cases/create-post.use-case';
import { ListPostsUseCase } from './application/use-cases/list-posts.use-case';
import { GetPostUseCase } from './application/use-cases/get-post.use-case';
import { UpdatePostUseCase } from './application/use-cases/update-post.use-case';
import { DeletePostUseCase } from './application/use-cases/delete-post.use-case';

import { CreateCommentUseCase } from './application/use-cases/create-comment.use-case';
import { ListCommentsUseCase } from './application/use-cases/list-comments.use-case';
import { UpdateCommentUseCase } from './application/use-cases/update-comment.use-case';
import { DeleteCommentUseCase } from './application/use-cases/delete-comment.use-case';

import { TogglePostLikeUseCase } from './application/use-cases/toggle-post-like.use-case';
import { ToggleCommentLikeUseCase } from './application/use-cases/toggle-comment-like.use-case';

import { CreateReportUseCase } from './application/use-cases/create-report.use-case';
import { ListReportsUseCase } from './application/use-cases/list-reports.use-case';
import { ResolveReportUseCase } from './application/use-cases/resolve-report.use-case';

import { UploadsModule } from '../uploads/uploads.module';
import { NotificationsModule } from '../notifications/notifications.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post, Comment, Like, Report, User]),
    UploadsModule,
    NotificationsModule, // ⭐ مهم
  ],
  controllers: [PostsController, CommentsController, ReportsController],
  providers: [
    { provide: PostRepository, useClass: TypeOrmPostRepository },
    { provide: CommentRepository, useClass: TypeOrmCommentRepository },
    { provide: LikeRepository, useClass: TypeOrmLikeRepository },
    { provide: ReportRepository, useClass: TypeOrmReportRepository },

    CreatePostUseCase,
    ListPostsUseCase,
    GetPostUseCase,
    UpdatePostUseCase,
    DeletePostUseCase,

    CreateCommentUseCase,
    ListCommentsUseCase,
    UpdateCommentUseCase,
    DeleteCommentUseCase,

    TogglePostLikeUseCase,
    ToggleCommentLikeUseCase,

    CreateReportUseCase,
    ListReportsUseCase,
    ResolveReportUseCase,
  ],
})
export class CommunityModule {}
