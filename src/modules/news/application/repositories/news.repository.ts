import { NewsArticle } from '../../domain/entities/news-article.entity';
import { CreateNewsDto } from '../dtos/create-news.dto';
import { UpdateNewsDto } from '../dtos/update-news.dto';
import { ListNewsDto } from '../dtos/list-news.dto';

export abstract class NewsRepository {
  abstract create(dto: CreateNewsDto, authorId: string): Promise<NewsArticle>;
  abstract findAll(query: ListNewsDto, publicOnly: boolean): Promise<{ data: NewsArticle[]; total: number }>;
  abstract findById(id: string): Promise<NewsArticle | null>;
  abstract findBySlug(slug: string): Promise<NewsArticle | null>;
  abstract update(id: string, dto: UpdateNewsDto): Promise<NewsArticle>;
  abstract delete(id: string): Promise<void>;
  abstract existsBySlug(slug: string): Promise<boolean>;
  abstract incrementViews(id: string): Promise<void>;
  abstract findFeatured(limit: number): Promise<NewsArticle[]>;
  abstract findRelated(articleId: string, category: string, limit: number): Promise<NewsArticle[]>;
}
