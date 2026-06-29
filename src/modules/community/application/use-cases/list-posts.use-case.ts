import { Injectable } from '@nestjs/common';
import { PostRepository } from '../repositories/post.repository';
import { ListPostsDto } from '../dtos/list-posts.dto';

@Injectable()
export class ListPostsUseCase {
  constructor(private readonly repo: PostRepository) {}
  execute(query: ListPostsDto) {
    return this.repo.findAll(query);
  }
}
