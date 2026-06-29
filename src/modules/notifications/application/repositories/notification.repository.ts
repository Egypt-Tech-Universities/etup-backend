import { Notification } from '../../domain/entities/notification.entity';
import { CreateNotificationDto } from '../dtos/create-notification.dto';
import { ListNotificationsDto } from '../dtos/list-notifications.dto';

export abstract class NotificationRepository {
  abstract create(dto: CreateNotificationDto): Promise<Notification>;
  abstract findUserNotifications(
    userId: string,
    query: ListNotificationsDto,
  ): Promise<{ data: Notification[]; total: number; unreadCount: number }>;
  abstract findById(id: string): Promise<Notification | null>;
  abstract markAsRead(id: string, userId: string): Promise<void>;
  abstract markAllAsRead(userId: string): Promise<void>;
  abstract delete(id: string, userId: string): Promise<void>;
  abstract getUnreadCount(userId: string): Promise<number>;
  abstract bulkCreate(dtos: CreateNotificationDto[]): Promise<void>;
}
