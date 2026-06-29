import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChatConversation } from '../../domain/entities/chat-conversation.entity';
import { ConversationRepository } from '../../application/repositories/conversation.repository';

@Injectable()
export class TypeOrmConversationRepository extends ConversationRepository {
  constructor(
    @InjectRepository(ChatConversation)
    private readonly repo: Repository<ChatConversation>,
  ) {
    super();
  }

  async create(userId?: string, sessionId?: string): Promise<ChatConversation> {
    const conv = this.repo.create({
      userId: userId || null,
      sessionId: sessionId || null,
    });
    return this.repo.save(conv);
  }

  async findById(id: string): Promise<ChatConversation | null> {
    return this.repo.findOne({ where: { id } });
  }

  async findByUser(userId: string, limit: number): Promise<ChatConversation[]> {
    return this.repo.find({
      where: { userId, isActive: true },
      order: { updatedAt: 'DESC' },
      take: limit,
    });
  }

  async findBySession(sessionId: string): Promise<ChatConversation | null> {
    return this.repo.findOne({
      where: { sessionId, isActive: true },
      order: { updatedAt: 'DESC' },
    });
  }

  async updateTitle(id: string, title: string): Promise<void> {
    await this.repo.update(id, { title });
  }

  async incrementMessages(id: string): Promise<void> {
    await this.repo.increment({ id }, 'messagesCount', 1);
  }

  async delete(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}
