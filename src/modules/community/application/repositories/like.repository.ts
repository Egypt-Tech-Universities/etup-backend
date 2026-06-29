import { Like } from '../../domain/entities/like.entity';

export abstract class LikeRepository {
  abstract likePost(userId: string, postId: string): Promise<Like | null>;
  abstract unlikePost(userId: string, postId: string): Promise<boolean>;
  abstract likeComment(userId: string, commentId: string): Promise<Like | null>;
  abstract unlikeComment(userId: string, commentId: string): Promise<boolean>;
  abstract hasUserLikedPost(userId: string, postId: string): Promise<boolean>;
  abstract hasUserLikedComment(userId: string, commentId: string): Promise<boolean>;
}
