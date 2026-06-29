import { Injectable } from '@nestjs/common';
import { NewsRepository } from '../repositories/news.repository';

@Injectable()
export class GetFeaturedNewsUseCase {
  constructor(private readonly repo: NewsRepository) {}

  execute(limit: number = 5) {
    return this.repo.findFeatured(limit);
  }
}
