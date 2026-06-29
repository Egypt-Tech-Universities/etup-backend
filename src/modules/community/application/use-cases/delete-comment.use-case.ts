import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CommentRepository } from '../repositories/comment.repository';
import { PostRepository } from '../repositories/post.repository';
import { UserRole } from '../../../../shared/enums/user-role.enum';

@Injectable()
export class DeleteCommentUseCase {
  constructor(
    private readonly commentRepo: CommentRepository,
    private readonly postRepo: PostRepository,
  ) {}

  async execute(id: string, userId: string, userRole: UserRole): Promise<void> {
    const comment = await this.commentRepo.findById(id);
    if (!comment) throw new NotFoundException(`Comment ${id} not found`);

    const isOwner = comment.authorId === userId;
    const isAdmin = userRole === UserRole.ADMIN || userRole === UserRole.MODERATOR;
    if (!isOwner && !isAdmin) throw new ForbiddenException('Cannot delete');

    await this.commentRepo.delete(id);
    await this.postRepo.incrementComments(comment.postId, -1);

    if (comment.parentId) {
      await this.commentRepo.incrementReplies(comment.parentId, -1);
    }
  }
}
