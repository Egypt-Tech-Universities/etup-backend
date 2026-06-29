import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from '../../domain/entities/post.entity';
import { PostRepository } from '../../application/repositories/post.repository';
import { CreatePostDto } from '../../application/dtos/create-post.dto';
import { UpdatePostDto } from '../../application/dtos/update-post.dto';
import { ListPostsDto } from '../../application/dtos/list-posts.dto';
import { getSkip } from '../../../../shared/utils/pagination.util';

@Injectable()
export class TypeOrmPostRepository extends PostRepository {
  constructor(
    @InjectRepository(Post)
    private readonly repo: Repository<Post>,
  ) {
    super();
  }

  async create(dto: CreatePostDto, authorId: string): Promise<Post> {
    const post = this.repo.create({ ...dto, authorId } as any);
    const saved = await this.repo.save(post);
    return Array.isArray(saved) ? saved[0] : saved;
  }

  async findAll(query: ListPostsDto): Promise<{ data: Post[]; total: number }> {
    const page = query.page ?? 1;
    const limit = query.limit ?? 10;
    const skip = getSkip(page, limit);

    const qb = this.repo
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.author', 'author')
      .leftJoinAndSelect('post.university', 'university')
      .where('post.isHidden = :hidden', { hidden: false });

    if (query.search) {
      qb.andWhere('(post.title ILIKE :s OR post.content ILIKE :s)', { s: `%${query.search}%` });
    }
    if (query.category) qb.andWhere('post.category = :cat', { cat: query.category });
    if (query.universityId) qb.andWhere('post.universityId = :uid', { uid: query.universityId });
    if (query.authorId) qb.andWhere('post.authorId = :aid', { aid: query.authorId });
    if (query.tag) qb.andWhere(':tag = ANY(post.tags)', { tag: query.tag });
    if (query.pinnedOnly) qb.andWhere('post.isPinned = true');

    switch (query.sortBy) {
      case 'popular':
        qb.orderBy('post.likesCount', 'DESC');
        break;
      case 'mostCommented':
        qb.orderBy('post.commentsCount', 'DESC');
        break;
      default:
        qb.orderBy('post.isPinned', 'DESC').addOrderBy('post.createdAt', 'DESC');
    }

    qb.skip(skip).take(limit);

    const [data, total] = await qb.getManyAndCount();
    return { data, total };
  }

  async findById(id: string): Promise<Post | null> {
    return this.repo.findOne({
      where: { id },
      relations: { author: true, university: true },
    });
  }

  async update(id: string, dto: UpdatePostDto): Promise<Post> {
    await this.repo.update(id, dto as any);
    return (await this.findById(id))!;
  }

  async delete(id: string): Promise<void> {
    await this.repo.delete(id);
  }

  async incrementViews(id: string): Promise<void> {
    await this.repo.increment({ id }, 'viewsCount', 1);
  }

  async incrementLikes(id: string, by: number): Promise<void> {
    if (by > 0) await this.repo.increment({ id }, 'likesCount', by);
    else await this.repo.decrement({ id }, 'likesCount', Math.abs(by));
  }

  async incrementComments(id: string, by: number): Promise<void> {
    if (by > 0) await this.repo.increment({ id }, 'commentsCount', by);
    else await this.repo.decrement({ id }, 'commentsCount', Math.abs(by));
  }
}
