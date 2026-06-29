import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { NewsArticle } from '../../domain/entities/news-article.entity';
import { NewsRepository } from '../../application/repositories/news.repository';
import { CreateNewsDto } from '../../application/dtos/create-news.dto';
import { UpdateNewsDto } from '../../application/dtos/update-news.dto';
import { ListNewsDto } from '../../application/dtos/list-news.dto';
import { NewsStatus } from '../../domain/enums/news-status.enum';
import { getSkip } from '../../../../shared/utils/pagination.util';

@Injectable()
export class TypeOrmNewsRepository extends NewsRepository {
  constructor(
    @InjectRepository(NewsArticle)
    private readonly repo: Repository<NewsArticle>,
  ) {
    super();
  }

  async create(dto: CreateNewsDto, authorId: string): Promise<NewsArticle> {
    const article = this.repo.create({
      ...dto,
      authorId,
      publishedAt: dto.status === NewsStatus.PUBLISHED ? new Date() : null,
    } as any);
    const saved = await this.repo.save(article);
    return Array.isArray(saved) ? saved[0] : saved;
  }

  async findAll(
    query: ListNewsDto,
    publicOnly: boolean,
  ): Promise<{ data: NewsArticle[]; total: number }> {
    const page = query.page ?? 1;
    const limit = query.limit ?? 10;
    const skip = getSkip(page, limit);

    const qb = this.repo
      .createQueryBuilder('news')
      .leftJoinAndSelect('news.author', 'author')
      .leftJoinAndSelect('news.university', 'university');

    // Public endpoints only show PUBLISHED
    if (publicOnly) {
      qb.where('news.status = :status', { status: NewsStatus.PUBLISHED });
    }

    if (query.search) {
      qb.andWhere(
        '(news.title ILIKE :s OR news.summary ILIKE :s OR news.content ILIKE :s)',
        { s: `%${query.search}%` },
      );
    }
    if (query.category) qb.andWhere('news.category = :cat', { cat: query.category });
    if (query.status && !publicOnly) qb.andWhere('news.status = :st', { st: query.status });
    if (query.universityId) qb.andWhere('news.universityId = :uid', { uid: query.universityId });
    if (query.authorId) qb.andWhere('news.authorId = :aid', { aid: query.authorId });
    if (query.tag) qb.andWhere(':tag = ANY(news.tags)', { tag: query.tag });
    if (query.featuredOnly) qb.andWhere('news.isFeatured = true');

    switch (query.sortBy) {
      case 'popular':
        qb.orderBy('news.viewsCount', 'DESC');
        break;
      case 'oldest':
        qb.orderBy('news.publishedAt', 'ASC', 'NULLS LAST');
        break;
      default:
        qb.orderBy('news.isPinned', 'DESC')
          .addOrderBy('news.publishedAt', 'DESC', 'NULLS LAST')
          .addOrderBy('news.createdAt', 'DESC');
    }

    qb.skip(skip).take(limit);

    const [data, total] = await qb.getManyAndCount();
    return { data, total };
  }

  async findById(id: string): Promise<NewsArticle | null> {
    return this.repo.findOne({
      where: { id },
      relations: { author: true, university: true },
    });
  }

  async findBySlug(slug: string): Promise<NewsArticle | null> {
    return this.repo.findOne({
      where: { slug },
      relations: { author: true, university: true },
    });
  }

  async update(id: string, dto: UpdateNewsDto): Promise<NewsArticle> {
    const updateData: any = { ...dto };

    // Auto-set publishedAt when status changes to PUBLISHED
    if (dto.status === NewsStatus.PUBLISHED) {
      const current = await this.repo.findOne({ where: { id } });
      if (current && !current.publishedAt) {
        updateData.publishedAt = new Date();
      }
    }

    await this.repo.update(id, updateData);
    return (await this.findById(id))!;
  }

  async delete(id: string): Promise<void> {
    await this.repo.delete(id);
  }

  async existsBySlug(slug: string): Promise<boolean> {
    const count = await this.repo.count({ where: { slug } });
    return count > 0;
  }

  async incrementViews(id: string): Promise<void> {
    await this.repo.increment({ id }, 'viewsCount', 1);
  }

  async findFeatured(limit: number): Promise<NewsArticle[]> {
    return this.repo.find({
      where: {
        isFeatured: true,
        status: NewsStatus.PUBLISHED,
      },
      relations: { author: true, university: true },
      order: { publishedAt: 'DESC' },
      take: limit,
    });
  }

  async findRelated(
    articleId: string,
    category: string,
    limit: number,
  ): Promise<NewsArticle[]> {
    return this.repo.find({
      where: {
        id: Not(articleId),
        category: category as any,
        status: NewsStatus.PUBLISHED,
      },
      relations: { author: true, university: true },
      order: { publishedAt: 'DESC' },
      take: limit,
    });
  }
}
