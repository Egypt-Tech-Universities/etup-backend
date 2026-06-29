import { Injectable } from '@nestjs/common';
import { CreateNotificationUseCase } from '../use-cases/create-notification.use-case';
import { NotificationsGateway } from '../../infrastructure/gateways/notifications.gateway';
import { NotificationType } from '../../domain/enums/notification-type.enum';

export interface NotifyParams {
  recipientId: string;
  senderId?: string;
  type: NotificationType;
  title: string;
  message: string;
  link?: string;
  iconUrl?: string;
  metadata?: any;
}

@Injectable()
export class NotificationService {
  constructor(
    private readonly createUC: CreateNotificationUseCase,
    private readonly gateway: NotificationsGateway,
  ) {}

  /**
   * Send a notification (save to DB + emit via WebSocket)
   */
  async notify(params: NotifyParams) {
    // Don't notify yourself
    if (params.senderId && params.senderId === params.recipientId) {
      return null;
    }

    const notif = await this.createUC.execute(params);
    if (!notif) return null;

    // Emit via WebSocket
    this.gateway.sendToUser(params.recipientId, 'notification:new', notif);

    return notif;
  }

  /**
   * Notify multiple users
   */
  async notifyMany(recipientIds: string[], params: Omit<NotifyParams, 'recipientId'>) {
    const results = await Promise.all(
      recipientIds.map((id) =>
        this.notify({ ...params, recipientId: id }),
      ),
    );
    return results.filter(Boolean);
  }
}
