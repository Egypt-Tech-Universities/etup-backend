import { ChatIntent } from '../../domain/entities/chat-intent.entity';
import { CreateIntentDto } from '../dtos/create-intent.dto';

export abstract class IntentRepository {
  abstract create(dto: CreateIntentDto): Promise<ChatIntent>;
  abstract findAll(): Promise<ChatIntent[]>;
  abstract findById(id: string): Promise<ChatIntent | null>;
  abstract update(id: string, dto: Partial<CreateIntentDto>): Promise<ChatIntent>;
  abstract delete(id: string): Promise<void>;
}
