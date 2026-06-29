import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { ConversationRepository } from '../repositories/conversation.repository';

@Injectable()
export class DeleteConversationUseCase {
  constructor(private readonly repo: ConversationRepository) {}

  async execute(id: string, userId: string) {
    const conversation = await this.repo.findById(id);
    if (!conversation) throw new NotFoundException('Conversation not found');

    if (conversation.userId !== userId) {
      throw new ForbiddenException('You cannot delete this conversation');
    }

    await this.repo.delete(id);
  }
}
