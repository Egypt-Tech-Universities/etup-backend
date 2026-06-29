import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { Notification } from './domain/entities/notification.entity';
import { NotificationPreference } from './domain/entities/notification-preference.entity';

import { NotificationsController } from './presentation/notifications.controller';
import { NotificationsGateway } from './infrastructure/gateways/notifications.gateway';

import { NotificationRepository } from './application/repositories/notification.repository';
import { PreferenceRepository } from './application/repositories/preference.repository';
import { TypeOrmNotificationRepository } from './infrastructure/repositories/typeorm-notification.repository';
import { TypeOrmPreferenceRepository } from './infrastructure/repositories/typeorm-preference.repository';

import { CreateNotificationUseCase } from './application/use-cases/create-notification.use-case';
import { ListNotificationsUseCase } from './application/use-cases/list-notifications.use-case';
import { MarkAsReadUseCase } from './application/use-cases/mark-as-read.use-case';
import { MarkAllAsReadUseCase } from './application/use-cases/mark-all-read.use-case';
import { DeleteNotificationUseCase } from './application/use-cases/delete-notification.use-case';
import { GetUnreadCountUseCase } from './application/use-cases/get-unread-count.use-case';
import {
  GetPreferencesUseCase,
  UpdatePreferencesUseCase,
} from './application/use-cases/preferences.use-case';
import { NotificationService } from './application/services/notification.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Notification, NotificationPreference]),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get('JWT_SECRET'),
      }),
    }),
  ],
  controllers: [NotificationsController],
  providers: [
    { provide: NotificationRepository, useClass: TypeOrmNotificationRepository },
    { provide: PreferenceRepository, useClass: TypeOrmPreferenceRepository },
    NotificationsGateway,
    CreateNotificationUseCase,
    ListNotificationsUseCase,
    MarkAsReadUseCase,
    MarkAllAsReadUseCase,
    DeleteNotificationUseCase,
    GetUnreadCountUseCase,
    GetPreferencesUseCase,
    UpdatePreferencesUseCase,
    NotificationService,
  ],
  exports: [NotificationService, NotificationsGateway],
})
export class NotificationsModule {}
