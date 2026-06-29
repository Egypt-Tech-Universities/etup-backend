import { Injectable, NotFoundException } from '@nestjs/common';
import { PostRepository } from '../repositories/post.repository';

@Injectable()
export class GetPostUseCase {
  constructor(private readonly repo: PostRepository) {}
  async execute(id: string) {
    const post = await this.repo.findById(id);
    if (!post) throw new NotFoundException(`Post ${id} not found`);
    await this.repo.incrementViews(id);
    return post;
  }
}
