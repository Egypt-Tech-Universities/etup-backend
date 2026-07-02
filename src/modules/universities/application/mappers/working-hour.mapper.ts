import { WorkingHour } from '../../domain/entities/working-hour.entity';
import { WorkingHourResponseDto } from '../../presentation/dto/working-hour-response.dto';

export function toWorkingHourResponse(wh: WorkingHour): WorkingHourResponseDto {
  return {
    id: wh.id,
    day: wh.day,
    openTime: wh.openTime || '',
    closeTime: wh.closeTime || '',
    isClosed: wh.isClosed,
  };
}

export function toWorkingHourResponseList(whs: WorkingHour[]): WorkingHourResponseDto[] {
  return whs.map(toWorkingHourResponse);
}
