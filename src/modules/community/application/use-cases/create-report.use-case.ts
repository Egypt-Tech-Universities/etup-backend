import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReportRepository } from '../repositories/report.repository';
import { CreateReportDto } from '../dtos/create-report.dto';
import { NotificationService } from '../../../notifications/application/services/notification.service';
import { NotificationType } from '../../../notifications/domain/enums/notification-type.enum';
import { User } from '../../../users/domain/entities/user.entity';
import { UserRole } from '../../../../shared/enums/user-role.enum';

@Injectable()
export class CreateReportUseCase {
  constructor(
    private readonly repo: ReportRepository,
    private readonly notificationService: NotificationService,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async execute(dto: CreateReportDto, reporterId: string) {
    const report = await this.repo.create(dto, reporterId);

    // 🔔 Notify all admins and moderators
    const admins = await this.userRepo.find({
      where: [
        { role: UserRole.ADMIN, isActive: true },
        { role: UserRole.MODERATOR, isActive: true },
      ],
      select: { id: true },
    });

    const adminIds = admins.map((a) => a.id);

    if (adminIds.length > 0) {
      await this.notificationService.notifyMany(adminIds, {
        senderId: reporterId,
        type: NotificationType.NEW_REPORT,
        title: '🚨 New Report Submitted',
        message: `A new ${dto.targetType.toLowerCase()} has been reported for: ${dto.reason}`,
        link: `/admin/reports`,
        metadata: {
          reportId: report.id,
          targetType: dto.targetType,
          targetId: dto.targetId,
          reason: dto.reason,
        },
      });
    }

    return report;
  }
}
