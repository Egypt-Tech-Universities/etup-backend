import { Injectable } from '@nestjs/common';
import { NotificationRepository } from '../repositories/notification.repository';
import { ListNotificationsDto } from '../dtos/list-notifications.dto';

@Injectable()
export class ListNotificationsUseCase {
  constructor(private readonly repo: NotificationRepository) {}

  execute(userId: string, query: ListNotificationsDto) {
    return this.repo.findUserNotifications(userId, query);
  }
}
