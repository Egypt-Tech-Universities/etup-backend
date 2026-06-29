import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ListNotificationsDto } from '../application/dtos/list-notifications.dto';
import { UpdatePreferencesDto } from '../application/dtos/update-preferences.dto';
import { ListNotificationsUseCase } from '../application/use-cases/list-notifications.use-case';
import { MarkAsReadUseCase } from '../application/use-cases/mark-as-read.use-case';
import { MarkAllAsReadUseCase } from '../application/use-cases/mark-all-read.use-case';
import { DeleteNotificationUseCase } from '../application/use-cases/delete-notification.use-case';
import { GetUnreadCountUseCase } from '../application/use-cases/get-unread-count.use-case';
import {
  GetPreferencesUseCase,
  UpdatePreferencesUseCase,
} from '../application/use-cases/preferences.use-case';
import { CurrentUser } from '../../../shared/decorators/current-user.decorator';

@ApiTags('Notifications')
@ApiBearerAuth()
@Controller('notifications')
export class NotificationsController {
  constructor(
    private readonly listUC: ListNotificationsUseCase,
    private readonly markReadUC: MarkAsReadUseCase,
    private readonly markAllReadUC: MarkAllAsReadUseCase,
    private readonly deleteUC: DeleteNotificationUseCase,
    private readonly unreadCountUC: GetUnreadCountUseCase,
    private readonly getPrefUC: GetPreferencesUseCase,
    private readonly updatePrefUC: UpdatePreferencesUseCase,
  ) {}

  @Get()
  @ApiOperation({ summary: 'List my notifications' })
  async list(
    @CurrentUser('id') userId: string,
    @Query() query: ListNotificationsDto,
  ) {
    const { data, total, unreadCount } = await this.listUC.execute(userId, query);
    const page = query.page ?? 1;
    const limit = query.limit ?? 20;
    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        unreadCount,
      },
    };
  }

  @Get('unread-count')
  @ApiOperation({ summary: 'Get unread notifications count' })
  unreadCount(@CurrentUser('id') userId: string) {
    return this.unreadCountUC.execute(userId);
  }

  @Patch(':id/read')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Mark a notification as read' })
  markRead(
    @Param('id', ParseUUIDPipe) id: string,
    @CurrentUser('id') userId: string,
  ) {
    return this.markReadUC.execute(id, userId);
  }

  @Patch('read-all')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Mark all notifications as read' })
  markAllRead(@CurrentUser('id') userId: string) {
    return this.markAllReadUC.execute(userId);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a notification' })
  remove(
    @Param('id', ParseUUIDPipe) id: string,
    @CurrentUser('id') userId: string,
  ) {
    return this.deleteUC.execute(id, userId);
  }

  // ============== Preferences ==============

  @Get('preferences')
  @ApiOperation({ summary: 'Get my notification preferences' })
  getPreferences(@CurrentUser('id') userId: string) {
    return this.getPrefUC.execute(userId);
  }

  @Patch('preferences')
  @ApiOperation({ summary: 'Update my notification preferences' })
  updatePreferences(
    @CurrentUser('id') userId: string,
    @Body() dto: UpdatePreferencesDto,
  ) {
    return this.updatePrefUC.execute(userId, dto);
  }
}
