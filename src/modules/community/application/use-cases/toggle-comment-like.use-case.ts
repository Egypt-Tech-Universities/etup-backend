import { Injectable, NotFoundException } from '@nestjs/common';
import { LikeRepository } from '../repositories/like.repository';
import { CommentRepository } from '../repositories/comment.repository';
import { NotificationService } from '../../../notifications/application/services/notification.service';
import { NotificationType } from '../../../notifications/domain/enums/notification-type.enum';

@Injectable()
export class ToggleCommentLikeUseCase {
  constructor(
    private readonly likeRepo: LikeRepository,
    private readonly commentRepo: CommentRepository,
    private readonly notificationService: NotificationService,
  ) {}

  async execute(userId: string, commentId: string) {
    const comment = await this.commentRepo.findById(commentId);
    if (!comment) throw new NotFoundException(`Comment ${commentId} not found`);

    const liked = await this.likeRepo.hasUserLikedComment(userId, commentId);

    if (liked) {
      await this.likeRepo.unlikeComment(userId, commentId);
      await this.commentRepo.incrementLikes(commentId, -1);
      return { liked: false };
    } else {
      await this.likeRepo.likeComment(userId, commentId);
      await this.commentRepo.incrementLikes(commentId, 1);

      // 🔔 Notify comment author
      await this.notificationService.notify({
        recipientId: comment.authorId,
        senderId: userId,
        type: NotificationType.COMMENT_LIKE,
        title: 'Comment Liked ❤️',
        message: `Someone liked your comment: "${comment.content.substring(0, 50)}${comment.content.length > 50 ? '...' : ''}"`,
        link: `/community/posts/${comment.postId}`,
        metadata: { commentId, postId: comment.postId },
      });

      return { liked: true };
    }
  }
}
