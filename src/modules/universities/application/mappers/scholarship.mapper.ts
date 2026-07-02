import { Scholarship } from '../../domain/entities/scholarship.entity';
import { ScholarshipResponseDto } from '../../presentation/dto/scholarship-response.dto';

export function toScholarshipResponse(sch: Scholarship): ScholarshipResponseDto {
  return {
    id: sch.id,
    name: sch.name,
    nameAr: sch.nameAr || '',
    description: sch.description,
    descriptionAr: sch.descriptionAr || '',
    criteria: sch.criteria || '',
  };
}

export function toScholarshipResponseList(schs: Scholarship[]): ScholarshipResponseDto[] {
  return schs.map(toScholarshipResponse);
}
