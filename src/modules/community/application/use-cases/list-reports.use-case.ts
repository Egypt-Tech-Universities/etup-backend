import { Injectable } from '@nestjs/common';
import { ReportRepository } from '../repositories/report.repository';
import { ReportStatus } from '../../domain/enums/report-reason.enum';

@Injectable()
export class ListReportsUseCase {
  constructor(private readonly repo: ReportRepository) {}
  execute(status: ReportStatus | undefined, page: number, limit: number) {
    return this.repo.findAll(status, page, limit);
  }
}
