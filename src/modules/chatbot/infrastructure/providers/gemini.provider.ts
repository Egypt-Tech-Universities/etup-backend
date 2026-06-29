import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { 
  IAIProvider, 
  AIResponse, 
  AIContext 
} from '../../application/services/ai-provider.interface';
import { IntentName } from '../../domain/enums/intent-name.enum';

@Injectable()
export class GeminiProvider extends IAIProvider {
  private genAI: GoogleGenerativeAI | null = null;
  private readonly logger = new Logger(GeminiProvider.name);

  constructor(private configService: ConfigService) {
    super();
    this.init();
  }

  private init() {
    const apiKey = this.configService.get<string>('GEMINI_API_KEY');
    if (apiKey) {
      this.genAI = new GoogleGenerativeAI(apiKey);
      this.logger.log('✅ Attempting to initialize Gemini with provided Key');
    } else {
      this.logger.error('❌ GEMINI_API_KEY is missing in .env');
    }
  }

  async generateResponse(message: string, context?: AIContext): Promise<AIResponse> {
    const isEnabled = this.configService.get<string>('GEMINI_ENABLED') === 'true';
    
    if (!this.genAI) this.init();

    if (!isEnabled || !this.genAI) {
      throw new Error('Gemini not configured');
    }

    try {
      const model = this.genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      
      const result = await model.generateContent(`أنت مساعد ذكي لجامعة تكنولوجية. سؤال الطالب: ${message}`);
      const response = await result.response;
      const text = response.text();

      return {
        content: text.trim(),
        intent: IntentName.UNKNOWN,
        confidence: 1,
        suggestions: ['كيف يمكنني التقديم؟', 'ما هي المصاريف؟']
      };
    } catch (error) {
      this.logger.error(`Gemini Error: ${error.message}`);
      throw error; // سيحول للـ Mock AI تلقائياً عند الفشل
    }
  }
}
