import { Injectable } from '@nestjs/common';
import { NotificationRepository } from '../repositories/notification.repository';

@Injectable()
export class DeleteNotificationUseCase {
  constructor(private readonly repo: NotificationRepository) {}

  execute(id: string, userId: string): Promise<void> {
    return this.repo.delete(id, userId);
  }
}
