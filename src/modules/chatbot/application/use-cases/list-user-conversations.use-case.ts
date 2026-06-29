import { Injectable } from '@nestjs/common';
import { ConversationRepository } from '../repositories/conversation.repository';

@Injectable()
export class ListUserConversationsUseCase {
  constructor(private readonly repo: ConversationRepository) {}

  async execute(userId: string, limit: number = 20) {
    return this.repo.findByUser(userId, limit);
  }
}
