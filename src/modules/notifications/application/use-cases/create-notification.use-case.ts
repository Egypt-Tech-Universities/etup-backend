import { Injectable } from '@nestjs/common';
import { NotificationRepository } from '../repositories/notification.repository';
import { PreferenceRepository } from '../repositories/preference.repository';
import { CreateNotificationDto } from '../dtos/create-notification.dto';
import { NotificationType } from '../../domain/enums/notification-type.enum';
import { NotificationPreference } from '../../domain/entities/notification-preference.entity';

@Injectable()
export class CreateNotificationUseCase {
  constructor(
    private readonly notifRepo: NotificationRepository,
    private readonly prefRepo: PreferenceRepository,
  ) {}

  async execute(dto: CreateNotificationDto) {
    // Check user preferences
    const allowed = await this.isNotificationAllowed(dto.recipientId, dto.type);
    if (!allowed) return null;

    return this.notifRepo.create(dto);
  }

  private async isNotificationAllowed(
    userId: string,
    type: NotificationType,
  ): Promise<boolean> {
    const mapping: Record<NotificationType, keyof NotificationPreference | null> = {
      [NotificationType.POST_LIKE]: 'postLikes',
      [NotificationType.POST_COMMENT]: 'postComments',
      [NotificationType.COMMENT_LIKE]: 'commentLikes',
      [NotificationType.COMMENT_REPLY]: 'commentReplies',
      [NotificationType.POST_MENTION]: 'mentions',
      [NotificationType.NEWS_PUBLISHED]: 'news',
      [NotificationType.NEWS_FEATURED]: 'news',
      [NotificationType.SYSTEM_ANNOUNCEMENT]: 'systemAnnouncements',
      [NotificationType.NEW_REPORT]: null,
      [NotificationType.REPORT_RESOLVED]: null,
      [NotificationType.WELCOME]: null,
      [NotificationType.PASSWORD_CHANGED]: null,
    };

    const field = mapping[type];
    if (!field) return true; // System notifications always allowed
    return this.prefRepo.isEnabled(userId, field);
  }
}
