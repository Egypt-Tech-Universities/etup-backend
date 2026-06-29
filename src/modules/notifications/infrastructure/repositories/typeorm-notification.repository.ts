import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from '../../domain/entities/notification.entity';
import { NotificationRepository } from '../../application/repositories/notification.repository';
import { CreateNotificationDto } from '../../application/dtos/create-notification.dto';
import { ListNotificationsDto } from '../../application/dtos/list-notifications.dto';
import { getSkip } from '../../../../shared/utils/pagination.util';

@Injectable()
export class TypeOrmNotificationRepository extends NotificationRepository {
  constructor(
    @InjectRepository(Notification)
    private readonly repo: Repository<Notification>,
  ) {
    super();
  }

  async create(dto: CreateNotificationDto): Promise<Notification> {
    const notification = this.repo.create(dto as any);
    const saved = await this.repo.save(notification);
    return Array.isArray(saved) ? saved[0] : saved;
  }

  async bulkCreate(dtos: CreateNotificationDto[]): Promise<void> {
    if (dtos.length === 0) return;
    const notifications = this.repo.create(dtos as any);
    await this.repo.save(notifications);
  }

  async findUserNotifications(
    userId: string,
    query: ListNotificationsDto,
  ): Promise<{ data: Notification[]; total: number; unreadCount: number }> {
    const page = query.page ?? 1;
    const limit = query.limit ?? 20;
    const skip = getSkip(page, limit);

    const qb = this.repo
      .createQueryBuilder('notif')
      .leftJoinAndSelect('notif.sender', 'sender')
      .where('notif.recipientId = :userId', { userId });

    if (query.type) qb.andWhere('notif.type = :type', { type: query.type });
    if (query.unreadOnly) qb.andWhere('notif.isRead = false');

    qb.orderBy('notif.createdAt', 'DESC').skip(skip).take(limit);

    const [data, total] = await qb.getManyAndCount();
    const unreadCount = await this.getUnreadCount(userId);

    return { data, total, unreadCount };
  }

  async findById(id: string): Promise<Notification | null> {
    return this.repo.findOne({
      where: { id },
      relations: { sender: true },
    });
  }

  async markAsRead(id: string, userId: string): Promise<void> {
    await this.repo.update(
      { id, recipientId: userId },
      { isRead: true, readAt: new Date() },
    );
  }

  async markAllAsRead(userId: string): Promise<void> {
    await this.repo.update(
      { recipientId: userId, isRead: false },
      { isRead: true, readAt: new Date() },
    );
  }

  async delete(id: string, userId: string): Promise<void> {
    await this.repo.delete({ id, recipientId: userId });
  }

  async getUnreadCount(userId: string): Promise<number> {
    return this.repo.count({
      where: { recipientId: userId, isRead: false },
    });
  }
}
