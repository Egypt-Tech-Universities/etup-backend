import { Injectable, NotFoundException } from '@nestjs/common';
import { NewsRepository } from '../repositories/news.repository';

@Injectable()
export class GetNewsBySlugUseCase {
  constructor(private readonly repo: NewsRepository) {}

  async execute(slug: string) {
    const article = await this.repo.findBySlug(slug);
    if (!article) throw new NotFoundException(`Article with slug "${slug}" not found`);
    await this.repo.incrementViews(article.id);
    return article;
  }
}
