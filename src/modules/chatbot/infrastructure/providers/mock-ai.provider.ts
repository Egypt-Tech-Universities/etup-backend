import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  AIContext,
  AIResponse,
  IAIProvider,
} from '../../application/services/ai-provider.interface';
import { IntentName } from '../../domain/enums/intent-name.enum';
import { ChatIntent } from '../../domain/entities/chat-intent.entity';
import { University } from '../../../universities/domain/entities/university.entity';
import { Program } from '../../../programs/domain/entities/program.entity';

@Injectable()
export class MockAIProvider extends IAIProvider {
  constructor(
    @InjectRepository(ChatIntent)
    private readonly intentRepo: Repository<ChatIntent>,
    @InjectRepository(University)
    private readonly uniRepo: Repository<University>,
    @InjectRepository(Program)
    private readonly programRepo: Repository<Program>,
  ) {
    super();
  }

  async generateResponse(message: string, context?: AIContext): Promise<AIResponse> {
    const lang = context?.language || 'en';
    const normalizedMsg = message.toLowerCase().trim();

    // 1) Try to match against intents
    const intents = await this.intentRepo.find({
      where: { isActive: true },
      order: { priority: 'DESC' },
    });

    let matchedIntent: ChatIntent | null = null;
    let highestScore = 0;

    for (const intent of intents) {
      const score = this.calculateMatchScore(normalizedMsg, intent.patterns);
      if (score > highestScore) {
        highestScore = score;
        matchedIntent = intent;
      }
    }

    // 2) If no match found, return UNKNOWN
    if (!matchedIntent || highestScore < 0.2) {
      return {
        content: lang === 'ar'
          ? 'عذرًا، لم أفهم سؤالك. هل يمكنك إعادة الصياغة؟ يمكنني مساعدتك في معلومات عن الجامعات، البرامج، شروط القبول، والرسوم.'
          : "I'm sorry, I didn't understand. Can you rephrase? I can help with information about universities, programs, admission requirements, and fees.",
        intent: IntentName.UNKNOWN,
        confidence: 0,
        suggestions: lang === 'ar' ? [
          'ما هي الجامعات التكنولوجية المتاحة؟',
          'كيف يمكنني التقدم؟',
          'ما هي الرسوم الدراسية؟',
        ] : [
          'What technological universities are available?',
          'How can I apply?',
          'What are the tuition fees?',
        ],
      };
    }

    // 3) Get response (random selection)
    const responses = lang === 'ar' && matchedIntent.responsesAr?.length
      ? matchedIntent.responsesAr
      : matchedIntent.responses;
    
    let content = responses[Math.floor(Math.random() * responses.length)];

    // 4) Enrich with data if needed
    if (matchedIntent.requiresData && matchedIntent.dataSource) {
      content = await this.enrichWithData(content, matchedIntent.dataSource, lang);
    }

    return {
      content,
      intent: matchedIntent.name,
      confidence: highestScore,
      suggestions: matchedIntent.followUpSuggestions || [],
      metadata: {
        matchedPatterns: matchedIntent.patterns.filter((p) =>
          normalizedMsg.includes(p.toLowerCase()),
        ),
      },
    };
  }

  // Simple keyword matching algorithm
  private calculateMatchScore(message: string, patterns: string[]): number {
    if (!patterns || patterns.length === 0) return 0;

    let matches = 0;
    for (const pattern of patterns) {
      const normalizedPattern = pattern.toLowerCase().trim();
      if (message.includes(normalizedPattern)) {
        // Longer patterns get higher weight
        matches += normalizedPattern.length / 10;
      }
    }

    return Math.min(matches / patterns.length, 1);
  }

  private async enrichWithData(
    template: string,
    dataSource: string,
    lang: 'en' | 'ar',
  ): Promise<string> {
    try {
      switch (dataSource) {
        case 'universities': {
          const unis = await this.uniRepo.find({
            where: { isActive: true },
            take: 5,
            order: { createdAt: 'ASC' },
          });
          const list = unis
            .map((u) => `• ${lang === 'ar' ? u.nameAr || u.name : u.name} (${u.city})`)
            .join('\n');
          return template.replace('{universities}', list);
        }
        case 'programs': {
          const programs = await this.programRepo.find({
            where: { isActive: true },
            take: 5,
            order: { isFeatured: 'DESC' },
          });
          const list = programs
            .map((p) => `${p.icon || '📚'} ${lang === 'ar' ? p.nameAr || p.name : p.name}`)
            .join('\n');
          return template.replace('{programs}', list);
        }
        default:
          return template;
      }
    } catch (error) {
      console.error('Error enriching data:', error);
      return template;
    }
  }
}
