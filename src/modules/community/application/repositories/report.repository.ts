import { Report } from '../../domain/entities/report.entity';
import { CreateReportDto } from '../dtos/create-report.dto';
import { ReportStatus } from '../../domain/enums/report-reason.enum';

export abstract class ReportRepository {
  abstract create(dto: CreateReportDto, reporterId: string): Promise<Report>;
  abstract findAll(status: ReportStatus | undefined, page: number, limit: number): Promise<{ data: Report[]; total: number }>;
  abstract findById(id: string): Promise<Report | null>;
  abstract resolve(id: string, adminId: string, status: ReportStatus, note?: string): Promise<Report>;
}
