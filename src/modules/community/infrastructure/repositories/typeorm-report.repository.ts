import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Report } from '../../domain/entities/report.entity';
import { ReportRepository } from '../../application/repositories/report.repository';
import { CreateReportDto } from '../../application/dtos/create-report.dto';
import { ReportStatus } from '../../domain/enums/report-reason.enum';
import { getSkip } from '../../../../shared/utils/pagination.util';

@Injectable()
export class TypeOrmReportRepository extends ReportRepository {
  constructor(
    @InjectRepository(Report)
    private readonly repo: Repository<Report>,
  ) {
    super();
  }

  async create(dto: CreateReportDto, reporterId: string): Promise<Report> {
    const report = this.repo.create({ ...dto, reporterId } as any);
    const saved = await this.repo.save(report);
    return Array.isArray(saved) ? saved[0] : saved;
  }

  async findAll(status: ReportStatus | undefined, page: number, limit: number) {
    const skip = getSkip(page, limit);
    const where = status ? { status } : {};
    const [data, total] = await this.repo.findAndCount({
      where,
      relations: { reporter: true, handledBy: true },
      order: { createdAt: 'DESC' },
      skip,
      take: limit,
    });
    return { data, total };
  }

  async findById(id: string): Promise<Report | null> {
    return this.repo.findOne({
      where: { id },
      relations: { reporter: true, handledBy: true },
    });
  }

  async resolve(id: string, adminId: string, status: ReportStatus, note?: string): Promise<Report> {
    await this.repo.update(id, {
      status,
      handledById: adminId,
      resolutionNote: note ?? null,
    });
    return (await this.findById(id))!;
  }
}
