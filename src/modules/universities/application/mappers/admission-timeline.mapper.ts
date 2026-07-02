import { AdmissionTimeline } from '../../domain/entities/admission-timeline.entity';
import { AdmissionTimelineResponseDto } from '../../presentation/dto/admission-timeline-response.dto';

export function toAdmissionTimelineResponse(t: AdmissionTimeline): AdmissionTimelineResponseDto {
  return {
    id: t.id,
    title: t.title,
    titleAr: t.titleAr || '',
    detail: t.detail || '',
    detailAr: t.detailAr || '',
    displayOrder: t.displayOrder,
  };
}

export function toAdmissionTimelineResponseList(list: AdmissionTimeline[]): AdmissionTimelineResponseDto[] {
  return list.map(toAdmissionTimelineResponse);
}
