import { Post } from '../../domain/entities/post.entity';
import { CreatePostDto } from '../dtos/create-post.dto';
import { UpdatePostDto } from '../dtos/update-post.dto';
import { ListPostsDto } from '../dtos/list-posts.dto';

export abstract class PostRepository {
  abstract create(dto: CreatePostDto, authorId: string): Promise<Post>;
  abstract findAll(query: ListPostsDto): Promise<{ data: Post[]; total: number }>;
  abstract findById(id: string): Promise<Post | null>;
  abstract update(id: string, dto: UpdatePostDto): Promise<Post>;
  abstract delete(id: string): Promise<void>;
  abstract incrementViews(id: string): Promise<void>;
  abstract incrementLikes(id: string, by: number): Promise<void>;
  abstract incrementComments(id: string, by: number): Promise<void>;
}
