import { Injectable, NotFoundException } from '@nestjs/common';
import { ConversationRepository } from '../repositories/conversation.repository';
import { MessageRepository } from '../repositories/message.repository';
import { IAIProvider } from '../services/ai-provider.interface';
import { SendMessageDto } from '../dtos/send-message.dto';
import { MessageRole } from '../../domain/enums/message-role.enum';

@Injectable()
export class SendMessageUseCase {
  constructor(
    private readonly conversationRepo: ConversationRepository,
    private readonly messageRepo: MessageRepository,
    private readonly aiProvider: IAIProvider,
  ) {}

  async execute(dto: SendMessageDto, userId?: string) {
    // 1) Get or create conversation
    let conversation;

    if (dto.conversationId) {
      conversation = await this.conversationRepo.findById(dto.conversationId);
      if (!conversation) {
        throw new NotFoundException('Conversation not found');
      }
    } else {
      conversation = await this.conversationRepo.create(userId, dto.sessionId);
    }

    // 2) Save user message
    const userMessage = await this.messageRepo.create({
      conversationId: conversation.id,
      role: MessageRole.USER,
      content: dto.message,
    });

    // 3) Get conversation context
    const recentMessages = await this.messageRepo.getRecentForContext(conversation.id, 6);
    const context = {
      previousMessages: recentMessages.map((m) => ({
        role: m.role,
        content: m.content,
      })),
      userId,
      language: dto.language || 'en',
    };

    // 4) Generate AI response
    const aiResponse = await this.aiProvider.generateResponse(dto.message, context);

    // 5) Save assistant message
    const assistantMessage = await this.messageRepo.create({
      conversationId: conversation.id,
      role: MessageRole.ASSISTANT,
      content: aiResponse.content,
      intent: aiResponse.intent,
      suggestions: aiResponse.suggestions,
      metadata: aiResponse.metadata,
    });

    // 6) Update conversation
    await this.conversationRepo.incrementMessages(conversation.id);
    await this.conversationRepo.incrementMessages(conversation.id);

    // 7) Set title if first message
    if (!conversation.title) {
      const title = dto.message.substring(0, 50) + (dto.message.length > 50 ? '...' : '');
      await this.conversationRepo.updateTitle(conversation.id, title);
    }

    return {
      conversationId: conversation.id,
      userMessage: {
        id: userMessage.id,
        content: userMessage.content,
        role: userMessage.role,
        createdAt: userMessage.createdAt,
      },
      assistantMessage: {
        id: assistantMessage.id,
        content: assistantMessage.content,
        role: assistantMessage.role,
        intent: assistantMessage.intent,
        suggestions: assistantMessage.suggestions,
        createdAt: assistantMessage.createdAt,
      },
    };
  }
}
