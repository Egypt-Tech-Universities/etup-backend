import { Injectable } from '@nestjs/common';
import { CommentRepository } from '../repositories/comment.repository';

@Injectable()
export class ListCommentsUseCase {
  constructor(private readonly repo: CommentRepository) {}
  execute(postId: string, page: number, limit: number) {
    return this.repo.findByPostId(postId, page, limit);
  }
}
