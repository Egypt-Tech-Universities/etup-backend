import { ConflictException, Injectable } from '@nestjs/common';
import { NewsRepository } from '../repositories/news.repository';
import { CreateNewsDto } from '../dtos/create-news.dto';
import { generateSlug } from '../../../../shared/utils/slug.util';

@Injectable()
export class CreateNewsUseCase {
  constructor(private readonly repo: NewsRepository) {}

  async execute(dto: CreateNewsDto, authorId: string) {
    if (!dto.slug) {
      dto.slug = generateSlug(dto.title);
    }

    const exists = await this.repo.existsBySlug(dto.slug);
    if (exists) {
      throw new ConflictException(`Article with slug "${dto.slug}" already exists`);
    }

    return this.repo.create(dto, authorId);
  }
}
