import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PostRepository } from '../repositories/post.repository';
import { UserRole } from '../../../../shared/enums/user-role.enum';

@Injectable()
export class DeletePostUseCase {
  constructor(private readonly repo: PostRepository) {}

  async execute(id: string, userId: string, userRole: UserRole): Promise<void> {
    const post = await this.repo.findById(id);
    if (!post) throw new NotFoundException(`Post ${id} not found`);

    const isOwner = post.authorId === userId;
    const isAdmin = userRole === UserRole.ADMIN || userRole === UserRole.MODERATOR;

    if (!isOwner && !isAdmin) {
      throw new ForbiddenException('You cannot delete this post');
    }
    await this.repo.delete(id);
  }
}
