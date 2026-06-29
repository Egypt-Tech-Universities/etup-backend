import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatConversation } from './domain/entities/chat-conversation.entity';
import { ChatMessage } from './domain/entities/chat-message.entity';
import { ChatIntent } from './domain/entities/chat-intent.entity';
import { University } from '../universities/domain/entities/university.entity';
import { Program } from '../programs/domain/entities/program.entity';
import { ChatbotController } from './presentation/chatbot.controller';
import { ConversationRepository } from './application/repositories/conversation.repository';
import { MessageRepository } from './application/repositories/message.repository';
import { IntentRepository } from './application/repositories/intent.repository';
import { IAIProvider } from './application/services/ai-provider.interface';
import { TypeOrmConversationRepository } from './infrastructure/repositories/typeorm-conversation.repository';
import { TypeOrmMessageRepository } from './infrastructure/repositories/typeorm-message.repository';
import { TypeOrmIntentRepository } from './infrastructure/repositories/typeorm-intent.repository';
import { MockAIProvider } from './infrastructure/providers/mock-ai.provider';
import { GeminiProvider } from './infrastructure/providers/gemini.provider';
import { SendMessageUseCase } from './application/use-cases/send-message.use-case';
import { GetConversationUseCase } from './application/use-cases/get-conversation.use-case';
import { ListUserConversationsUseCase } from './application/use-cases/list-user-conversations.use-case';
import { DeleteConversationUseCase } from './application/use-cases/delete-conversation.use-case';
import {
  CreateIntentUseCase,
  DeleteIntentUseCase,
  ListIntentsUseCase,
  UpdateIntentUseCase,
} from './application/use-cases/manage-intents.use-case';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ChatConversation,
      ChatMessage,
      ChatIntent,
      University,
      Program,
    ]),
  ],
  controllers: [ChatbotController],
  providers: [
    { provide: ConversationRepository, useClass: TypeOrmConversationRepository },
    { provide: MessageRepository, useClass: TypeOrmMessageRepository },
    { provide: IntentRepository, useClass: TypeOrmIntentRepository },

    GeminiProvider,
    MockAIProvider,

    // 🔥 force Gemini only for debugging
    { provide: IAIProvider, useExisting: GeminiProvider },

    SendMessageUseCase,
    GetConversationUseCase,
    ListUserConversationsUseCase,
    DeleteConversationUseCase,
    CreateIntentUseCase,
    ListIntentsUseCase,
    UpdateIntentUseCase,
    DeleteIntentUseCase,
  ],
})
export class ChatbotModule {}
