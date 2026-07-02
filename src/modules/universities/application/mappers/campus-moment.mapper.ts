import { CampusMoment } from '../../domain/entities/campus-moment.entity';
import { CampusMomentResponseDto } from '../../presentation/dto/campus-moment-response.dto';

export function toCampusMomentResponse(m: CampusMoment): CampusMomentResponseDto {
  return {
    id: m.id,
    description: m.description,
    descriptionAr: m.descriptionAr || '',
    icon: m.icon || '',
    displayOrder: m.displayOrder,
  };
}

export function toCampusMomentResponseList(list: CampusMoment[]): CampusMomentResponseDto[] {
  return list.map(toCampusMomentResponse);
}
