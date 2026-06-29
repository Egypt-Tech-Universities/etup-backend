import { Injectable, NotFoundException } from '@nestjs/common';
import { LikeRepository } from '../repositories/like.repository';
import { PostRepository } from '../repositories/post.repository';
import { NotificationService } from '../../../notifications/application/services/notification.service';
import { NotificationType } from '../../../notifications/domain/enums/notification-type.enum';

@Injectable()
export class TogglePostLikeUseCase {
  constructor(
    private readonly likeRepo: LikeRepository,
    private readonly postRepo: PostRepository,
    private readonly notificationService: NotificationService,
  ) {}

  async execute(userId: string, postId: string) {
    const post = await this.postRepo.findById(postId);
    if (!post) throw new NotFoundException(`Post ${postId} not found`);

    const liked = await this.likeRepo.hasUserLikedPost(userId, postId);

    if (liked) {
      await this.likeRepo.unlikePost(userId, postId);
      await this.postRepo.incrementLikes(postId, -1);
      return { liked: false };
    } else {
      await this.likeRepo.likePost(userId, postId);
      await this.postRepo.incrementLikes(postId, 1);

      // 🔔 Send notification to post author
      await this.notificationService.notify({
        recipientId: post.authorId,
        senderId: userId,
        type: NotificationType.POST_LIKE,
        title: 'New Like 👍',
        message: `Someone liked your post: "${post.title.substring(0, 50)}${post.title.length > 50 ? '...' : ''}"`,
        link: `/community/posts/${postId}`,
        metadata: { postId, postTitle: post.title },
      });

      return { liked: true };
    }
  }
}
