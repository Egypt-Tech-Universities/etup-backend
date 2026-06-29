import { Injectable, NotFoundException } from '@nestjs/common';
import { NewsRepository } from '../repositories/news.repository';

@Injectable()
export class GetRelatedNewsUseCase {
  constructor(private readonly repo: NewsRepository) {}

  async execute(articleId: string, limit: number = 5) {
    const article = await this.repo.findById(articleId);
    if (!article) throw new NotFoundException('Article not found');
    return this.repo.findRelated(articleId, article.category, limit);
  }
}
