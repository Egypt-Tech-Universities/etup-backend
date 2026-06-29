import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateReportDto } from '../application/dtos/create-report.dto';
import { ResolveReportDto } from '../application/dtos/resolve-report.dto';
import { CreateReportUseCase } from '../application/use-cases/create-report.use-case';
import { ListReportsUseCase } from '../application/use-cases/list-reports.use-case';
import { ResolveReportUseCase } from '../application/use-cases/resolve-report.use-case';
import { CurrentUser } from '../../../shared/decorators/current-user.decorator';
import { Roles } from '../../../shared/decorators/roles.decorator';
import { RolesGuard } from '../../../shared/guards/roles.guard';
import { UserRole } from '../../../shared/enums/user-role.enum';
import { ReportStatus } from '../domain/enums/report-reason.enum';

@ApiTags('Community - Reports')
@Controller('community/reports')
@ApiBearerAuth()
export class ReportsController {
  constructor(
    private readonly createUC: CreateReportUseCase,
    private readonly listUC: ListReportsUseCase,
    private readonly resolveUC: ResolveReportUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Report a post or comment' })
  create(@Body() dto: CreateReportDto, @CurrentUser('id') userId: string) {
    return this.createUC.execute(dto, userId);
  }

  @Get()
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MODERATOR)
  @ApiOperation({ summary: 'List all reports (admin/moderator)' })
  async list(
    @Query('status') status?: ReportStatus,
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ) {
    const { data, total } = await this.listUC.execute(status, +page, +limit);
    return {
      data,
      meta: { total, page: +page, limit: +limit, totalPages: Math.ceil(total / +limit) },
    };
  }

  @Patch(':id/resolve')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MODERATOR)
  @ApiOperation({ summary: 'Resolve a report (admin/moderator)' })
  resolve(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: ResolveReportDto,
    @CurrentUser('id') adminId: string,
  ) {
    return this.resolveUC.execute(id, dto, adminId);
  }
}
