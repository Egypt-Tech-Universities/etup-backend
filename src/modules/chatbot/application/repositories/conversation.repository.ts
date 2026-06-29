import { ChatConversation } from '../../domain/entities/chat-conversation.entity';

export abstract class ConversationRepository {
  abstract create(userId?: string, sessionId?: string): Promise<ChatConversation>;
  abstract findById(id: string): Promise<ChatConversation | null>;
  abstract findByUser(userId: string, limit: number): Promise<ChatConversation[]>;
  abstract findBySession(sessionId: string): Promise<ChatConversation | null>;
  abstract updateTitle(id: string, title: string): Promise<void>;
  abstract incrementMessages(id: string): Promise<void>;
  abstract delete(id: string): Promise<void>;
}
