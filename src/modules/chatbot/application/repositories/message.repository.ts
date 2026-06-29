import { ChatMessage } from '../../domain/entities/chat-message.entity';
import { MessageRole } from '../../domain/enums/message-role.enum';
import { IntentName } from '../../domain/enums/intent-name.enum';

export interface CreateMessageData {
  conversationId: string;
  role: MessageRole;
  content: string;
  intent?: IntentName;
  suggestions?: string[];
  metadata?: any;
}

export abstract class MessageRepository {
  abstract create(data: CreateMessageData): Promise<ChatMessage>;
  abstract findByConversation(conversationId: string, limit?: number): Promise<ChatMessage[]>;
  abstract getRecentForContext(conversationId: string, limit: number): Promise<ChatMessage[]>;
}
