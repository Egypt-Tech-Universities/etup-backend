import { Injectable } from '@nestjs/common';
import { PostRepository } from '../repositories/post.repository';
import { CreatePostDto } from '../dtos/create-post.dto';

@Injectable()
export class CreatePostUseCase {
  constructor(private readonly repo: PostRepository) {}
  execute(dto: CreatePostDto, authorId: string) {
    return this.repo.create(dto, authorId);
  }
}
