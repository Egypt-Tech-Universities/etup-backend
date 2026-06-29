import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { NewsRepository } from '../repositories/news.repository';
import { UserRole } from '../../../../shared/enums/user-role.enum';

@Injectable()
export class DeleteNewsUseCase {
  constructor(private readonly repo: NewsRepository) {}

  async execute(id: string, userId: string, userRole: UserRole): Promise<void> {
    const article = await this.repo.findById(id);
    if (!article) throw new NotFoundException(`Article ${id} not found`);

    const isAuthor = article.authorId === userId;
    const isAdmin = userRole === UserRole.ADMIN || userRole === UserRole.MODERATOR;

    if (!isAuthor && !isAdmin) {
      throw new ForbiddenException('You cannot delete this article');
    }

    await this.repo.delete(id);
  }
}
