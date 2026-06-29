import { Injectable, NotFoundException } from '@nestjs/common';
import { NotificationRepository } from '../repositories/notification.repository';

@Injectable()
export class MarkAsReadUseCase {
  constructor(private readonly repo: NotificationRepository) {}

  async execute(id: string, userId: string): Promise<void> {
    const notif = await this.repo.findById(id);
    if (!notif || notif.recipientId !== userId) {
      throw new NotFoundException('Notification not found');
    }
    await this.repo.markAsRead(id, userId);
  }
}
