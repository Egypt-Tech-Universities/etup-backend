import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { NewsArticle } from './domain/entities/news-article.entity';
import { NewsController } from './presentation/news.controller';
import { NewsRepository } from './application/repositories/news.repository';
import { TypeOrmNewsRepository } from './infrastructure/repositories/typeorm-news.repository';

import { CreateNewsUseCase } from './application/use-cases/create-news.use-case';
import { ListNewsUseCase } from './application/use-cases/list-news.use-case';
import { GetNewsUseCase } from './application/use-cases/get-news.use-case';
import { GetNewsBySlugUseCase } from './application/use-cases/get-news-by-slug.use-case';
import { UpdateNewsUseCase } from './application/use-cases/update-news.use-case';
import { DeleteNewsUseCase } from './application/use-cases/delete-news.use-case';
import { GetFeaturedNewsUseCase } from './application/use-cases/get-featured-news.use-case';
import { GetRelatedNewsUseCase } from './application/use-cases/get-related-news.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([NewsArticle])],
  controllers: [NewsController],
  providers: [
    { provide: NewsRepository, useClass: TypeOrmNewsRepository },
    CreateNewsUseCase,
    ListNewsUseCase,
    GetNewsUseCase,
    GetNewsBySlugUseCase,
    UpdateNewsUseCase,
    DeleteNewsUseCase,
    GetFeaturedNewsUseCase,
    GetRelatedNewsUseCase,
  ],
  exports: [NewsRepository],
})
export class NewsModule {}
