import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CommentRepository } from '../repositories/comment.repository';
import { PostRepository } from '../repositories/post.repository';
import { CreateCommentDto } from '../dtos/create-comment.dto';
import { NotificationService } from '../../../notifications/application/services/notification.service';
import { NotificationType } from '../../../notifications/domain/enums/notification-type.enum';

@Injectable()
export class CreateCommentUseCase {
  constructor(
    private readonly commentRepo: CommentRepository,
    private readonly postRepo: PostRepository,
    private readonly notificationService: NotificationService,
  ) {}

  async execute(postId: string, dto: CreateCommentDto, authorId: string) {
    const post = await this.postRepo.findById(postId);
    if (!post) throw new NotFoundException(`Post ${postId} not found`);
    if (post.isLocked) throw new BadRequestException('Comments are locked');

    const comment = await this.commentRepo.create(dto, postId, authorId);
    await this.postRepo.incrementComments(postId, 1);

    if (dto.parentId) {
      // 🔔 Reply: notify parent comment author
      const parentComment = await this.commentRepo.findById(dto.parentId);
      await this.commentRepo.incrementReplies(dto.parentId, 1);

      if (parentComment) {
        await this.notificationService.notify({
          recipientId: parentComment.authorId,
          senderId: authorId,
          type: NotificationType.COMMENT_REPLY,
          title: 'New Reply 💬',
          message: `Someone replied to your comment: "${dto.content.substring(0, 60)}${dto.content.length > 60 ? '...' : ''}"`,
          link: `/community/posts/${postId}`,
          metadata: {
            postId,
            commentId: comment.id,
            parentCommentId: dto.parentId,
          },
        });
      }
    } else {
      // 🔔 Comment: notify post author
      await this.notificationService.notify({
        recipientId: post.authorId,
        senderId: authorId,
        type: NotificationType.POST_COMMENT,
        title: 'New Comment 💬',
        message: `Someone commented on your post: "${dto.content.substring(0, 60)}${dto.content.length > 60 ? '...' : ''}"`,
        link: `/community/posts/${postId}`,
        metadata: {
          postId,
          commentId: comment.id,
          postTitle: post.title,
        },
      });
    }

    return comment;
  }
}
