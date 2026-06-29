import { Injectable } from '@nestjs/common';
import { NotificationRepository } from '../repositories/notification.repository';

@Injectable()
export class GetUnreadCountUseCase {
  constructor(private readonly repo: NotificationRepository) {}

  async execute(userId: string): Promise<{ count: number }> {
    const count = await this.repo.getUnreadCount(userId);
    return { count };
  }
}
