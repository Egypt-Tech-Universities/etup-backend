import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { Comment } from '../../domain/entities/comment.entity';
import { CommentRepository } from '../../application/repositories/comment.repository';
import { CreateCommentDto } from '../../application/dtos/create-comment.dto';
import { getSkip } from '../../../../shared/utils/pagination.util';

@Injectable()
export class TypeOrmCommentRepository extends CommentRepository {
  constructor(
    @InjectRepository(Comment)
    private readonly repo: Repository<Comment>,
  ) {
    super();
  }

  async create(dto: CreateCommentDto, postId: string, authorId: string): Promise<Comment> {
    const comment = this.repo.create({ ...dto, postId, authorId } as any);
    const saved = await this.repo.save(comment);
    return Array.isArray(saved) ? saved[0] : saved;
  }

  async findByPostId(postId: string, page: number, limit: number) {
    const skip = getSkip(page, limit);
    const [data, total] = await this.repo.findAndCount({
      where: { postId, parentId: IsNull(), isHidden: false },
      relations: { author: true, replies: { author: true } },
      order: { createdAt: 'DESC' },
      skip,
      take: limit,
    });
    return { data, total };
  }

  async findById(id: string): Promise<Comment | null> {
    return this.repo.findOne({
      where: { id },
      relations: { author: true, post: true },
    });
  }

  async update(id: string, content: string): Promise<Comment> {
    await this.repo.update(id, { content });
    return (await this.findById(id))!;
  }

  async delete(id: string): Promise<void> {
    await this.repo.delete(id);
  }

  async incrementLikes(id: string, by: number): Promise<void> {
    if (by > 0) await this.repo.increment({ id }, 'likesCount', by);
    else await this.repo.decrement({ id }, 'likesCount', Math.abs(by));
  }

  async incrementReplies(id: string, by: number): Promise<void> {
    if (by > 0) await this.repo.increment({ id }, 'repliesCount', by);
    else await this.repo.decrement({ id }, 'repliesCount', Math.abs(by));
  }
}
