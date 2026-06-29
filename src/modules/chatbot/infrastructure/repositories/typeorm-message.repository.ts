import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChatMessage } from '../../domain/entities/chat-message.entity';
import {
  CreateMessageData,
  MessageRepository,
} from '../../application/repositories/message.repository';

@Injectable()
export class TypeOrmMessageRepository extends MessageRepository {
  constructor(
    @InjectRepository(ChatMessage)
    private readonly repo: Repository<ChatMessage>,
  ) {
    super();
  }

  async create(data: CreateMessageData): Promise<ChatMessage> {
    const msg = this.repo.create({
      conversationId: data.conversationId,
      role: data.role,
      content: data.content,
      intent: data.intent ?? null,
      suggestions: data.suggestions ?? null,
      metadata: data.metadata ?? null,
    } as any);
    const saved = await this.repo.save(msg);
    return Array.isArray(saved) ? saved[0] : saved;
  }

  async findByConversation(conversationId: string, limit: number = 100): Promise<ChatMessage[]> {
    return this.repo.find({
      where: { conversationId },
      order: { createdAt: 'ASC' },
      take: limit,
    });
  }

  async getRecentForContext(conversationId: string, limit: number = 10): Promise<ChatMessage[]> {
    const messages = await this.repo.find({
      where: { conversationId },
      order: { createdAt: 'DESC' },
      take: limit,
    });
    return messages.reverse();
  }
}
