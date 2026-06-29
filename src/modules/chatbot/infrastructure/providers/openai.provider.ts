import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';
import { 
  IAIProvider, 
  AIResponse, 
  AIContext 
} from '../../application/services/ai-provider.interface';
import { IntentName } from '../../domain/enums/intent-name.enum';

@Injectable()
export class OpenAIProvider extends IAIProvider {
  private openai: OpenAI | null = null;
  private readonly logger = new Logger(OpenAIProvider.name);

  constructor(private configService: ConfigService) {
    super();
    this.initOpenAI();
  }

  private initOpenAI() {
    const apiKey = this.configService.get<string>('OPENAI_API_KEY');
    if (apiKey) {
      this.openai = new OpenAI({ apiKey });
    }
  }

  async generateResponse(message: string, context?: AIContext): Promise<AIResponse> {
    const isEnabled = this.configService.get<string>('OPENAI_ENABLED') === 'true';
    
    // Re-check if not initialized
    if (!this.openai) this.initOpenAI();

    if (!isEnabled || !this.openai) {
        this.logger.warn('OpenAI is disabled or API Key is missing.');
        throw new Error('OpenAI Provider not available');
    }

    try {
      const systemPrompt = `
        You are an assistant for the "Egyptian Technological Universities Portal".
        You help students with information about Egypt's 14 technological universities.
        Be helpful, professional, and friendly. Support both Arabic and English.
      `;

      const response = await this.openai.chat.completions.create({
        model: this.configService.get('OPENAI_MODEL') || 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: message }
        ],
        max_tokens: Number(this.configService.get('OPENAI_MAX_TOKENS')) || 500,
        temperature: 0.7,
      });

      return {
        content: response.choices[0].message.content || '',
        intent: IntentName.UNKNOWN,
        confidence: 1,
        suggestions: ['Tell me more', 'How to apply?'],
      };
    } catch (error) {
      this.logger.error(`OpenAI Error: ${error.message}`);
      throw error; 
    }
  }
}
