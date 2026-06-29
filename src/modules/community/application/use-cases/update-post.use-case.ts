import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PostRepository } from '../repositories/post.repository';
import { UpdatePostDto } from '../dtos/update-post.dto';
import { UserRole } from '../../../../shared/enums/user-role.enum';

@Injectable()
export class UpdatePostUseCase {
  constructor(private readonly repo: PostRepository) {}

  async execute(id: string, dto: UpdatePostDto, userId: string, userRole: UserRole) {
    const post = await this.repo.findById(id);
    if (!post) throw new NotFoundException(`Post ${id} not found`);

    const isOwner = post.authorId === userId;
    const isAdmin = userRole === UserRole.ADMIN || userRole === UserRole.MODERATOR;

    if (!isOwner && !isAdmin) {
      throw new ForbiddenException('You cannot edit this post');
    }

    // Only admin can change pinned/locked/hidden
    if (!isAdmin) {
      delete (dto as any).isPinned;
      delete (dto as any).isLocked;
      delete (dto as any).isHidden;
    }

    return this.repo.update(id, dto);
  }
}
