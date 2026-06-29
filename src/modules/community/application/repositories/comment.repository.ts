import { Comment } from '../../domain/entities/comment.entity';
import { CreateCommentDto } from '../dtos/create-comment.dto';

export abstract class CommentRepository {
  abstract create(dto: CreateCommentDto, postId: string, authorId: string): Promise<Comment>;
  abstract findByPostId(postId: string, page: number, limit: number): Promise<{ data: Comment[]; total: number }>;
  abstract findById(id: string): Promise<Comment | null>;
  abstract update(id: string, content: string): Promise<Comment>;
  abstract delete(id: string): Promise<void>;
  abstract incrementLikes(id: string, by: number): Promise<void>;
  abstract incrementReplies(id: string, by: number): Promise<void>;
}
