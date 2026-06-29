import { Injectable } from '@nestjs/common';
import { NotificationRepository } from '../repositories/notification.repository';

@Injectable()
export class MarkAllAsReadUseCase {
  constructor(private readonly repo: NotificationRepository) {}

  execute(userId: string): Promise<void> {
    return this.repo.markAllAsRead(userId);
  }
}
