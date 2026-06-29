import { IntentName } from '../../domain/enums/intent-name.enum';

export interface AIResponse {
  content: string;
  intent: IntentName;
  confidence: number; // 0 to 1
  suggestions?: string[];
  metadata?: any;
}

export interface AIContext {
  previousMessages?: { role: string; content: string }[];
  userId?: string;
  language?: 'en' | 'ar';
}

export abstract class IAIProvider {
  abstract generateResponse(message: string, context?: AIContext): Promise<AIResponse>;
}
