import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { NewsRepository } from '../repositories/news.repository';
import { UpdateNewsDto } from '../dtos/update-news.dto';
import { UserRole } from '../../../../shared/enums/user-role.enum';

@Injectable()
export class UpdateNewsUseCase {
  constructor(private readonly repo: NewsRepository) {}

  async execute(id: string, dto: UpdateNewsDto, userId: string, userRole: UserRole) {
    const article = await this.repo.findById(id);
    if (!article) throw new NotFoundException(`Article ${id} not found`);

    const isAuthor = article.authorId === userId;
    const isAdmin = userRole === UserRole.ADMIN || userRole === UserRole.MODERATOR;

    if (!isAuthor && !isAdmin) {
      throw new ForbiddenException('You cannot edit this article');
    }

    return this.repo.update(id, dto);
  }
}
