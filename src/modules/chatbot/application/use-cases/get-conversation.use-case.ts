import { Injectable, NotFoundException } from '@nestjs/common';
import { ConversationRepository } from '../repositories/conversation.repository';
import { MessageRepository } from '../repositories/message.repository';

@Injectable()
export class GetConversationUseCase {
  constructor(
    private readonly conversationRepo: ConversationRepository,
    private readonly messageRepo: MessageRepository,
  ) {}

  async execute(conversationId: string) {
    const conversation = await this.conversationRepo.findById(conversationId);
    if (!conversation) {
      throw new NotFoundException('Conversation not found');
    }

    const messages = await this.messageRepo.findByConversation(conversationId);

    return {
      ...conversation,
      messages,
    };
  }
}
