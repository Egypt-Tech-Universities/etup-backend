import { Injectable } from '@nestjs/common';
import { NewsRepository } from '../repositories/news.repository';
import { ListNewsDto } from '../dtos/list-news.dto';

@Injectable()
export class ListNewsUseCase {
  constructor(private readonly repo: NewsRepository) {}

  execute(query: ListNewsDto, publicOnly: boolean = true) {
    return this.repo.findAll(query, publicOnly);
  }
}
