import { Injectable, NotFoundException } from '@nestjs/common';
import { NewsRepository } from '../repositories/news.repository';

@Injectable()
export class GetNewsUseCase {
  constructor(private readonly repo: NewsRepository) {}

  async execute(id: string) {
    const article = await this.repo.findById(id);
    if (!article) throw new NotFoundException(`Article ${id} not found`);
    await this.repo.incrementViews(id);
    return article;
  }
}
