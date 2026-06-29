import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return '🎓 Egyptian Universities API is running! Visit /api/docs for documentation.';
  }
}
