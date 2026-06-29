import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CommentRepository } from '../repositories/comment.repository';
import { UserRole } from '../../../../shared/enums/user-role.enum';

@Injectable()
export class UpdateCommentUseCase {
  constructor(private readonly repo: CommentRepository) {}

  async execute(id: string, content: string, userId: string, userRole: UserRole) {
    const comment = await this.repo.findById(id);
    if (!comment) throw new NotFoundException(`Comment ${id} not found`);

    const isOwner = comment.authorId === userId;
    const isAdmin = userRole === UserRole.ADMIN || userRole === UserRole.MODERATOR;
    if (!isOwner && !isAdmin) throw new ForbiddenException('Cannot edit');

    return this.repo.update(id, content);
  }
}
