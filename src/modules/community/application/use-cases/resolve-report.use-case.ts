import { Injectable, NotFoundException } from '@nestjs/common';
import { ReportRepository } from '../repositories/report.repository';
import { ResolveReportDto } from '../dtos/resolve-report.dto';

@Injectable()
export class ResolveReportUseCase {
  constructor(private readonly repo: ReportRepository) {}

  async execute(id: string, dto: ResolveReportDto, adminId: string) {
    const report = await this.repo.findById(id);
    if (!report) throw new NotFoundException(`Report ${id} not found`);
    return this.repo.resolve(id, adminId, dto.status, dto.resolutionNote);
  }
}
