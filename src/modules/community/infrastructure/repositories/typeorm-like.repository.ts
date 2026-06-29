import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Like } from '../../domain/entities/like.entity';
import { LikeRepository } from '../../application/repositories/like.repository';

@Injectable()
export class TypeOrmLikeRepository extends LikeRepository {
  constructor(
    @InjectRepository(Like)
    private readonly repo: Repository<Like>,
  ) {
    super();
  }

  async likePost(userId: string, postId: string): Promise<Like | null> {
    const exists = await this.repo.findOne({ where: { userId, postId } });
    if (exists) return null;
    const like = this.repo.create({ userId, postId });
    return this.repo.save(like);
  }

  async unlikePost(userId: string, postId: string): Promise<boolean> {
    const result = await this.repo.delete({ userId, postId });
    return (result.affected ?? 0) > 0;
  }

  async likeComment(userId: string, commentId: string): Promise<Like | null> {
    const exists = await this.repo.findOne({ where: { userId, commentId } });
    if (exists) return null;
    const like = this.repo.create({ userId, commentId });
    return this.repo.save(like);
  }

  async unlikeComment(userId: string, commentId: string): Promise<boolean> {
    const result = await this.repo.delete({ userId, commentId });
    return (result.affected ?? 0) > 0;
  }

  async hasUserLikedPost(userId: string, postId: string): Promise<boolean> {
    const count = await this.repo.count({ where: { userId, postId } });
    return count > 0;
  }

  async hasUserLikedComment(userId: string, commentId: string): Promise<boolean> {
    const count = await this.repo.count({ where: { userId, commentId } });
    return count > 0;
  }
}
