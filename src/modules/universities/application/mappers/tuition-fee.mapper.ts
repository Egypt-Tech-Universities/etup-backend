import { TuitionFee } from '../../domain/entities/tuition-fee.entity';
import { TuitionFeeResponseDto } from '../../presentation/dto/tuition-fee-response.dto';

export function toTuitionFeeResponse(fee: TuitionFee): TuitionFeeResponseDto {
  return {
    id: fee.id,
    yearRange: fee.yearRange,
    amount: fee.amount,
    currency: fee.currency || 'EGP',
    academicYear: fee.academicYear || '',
    notes: fee.notes || '',
  };
}

export function toTuitionFeeResponseList(fees: TuitionFee[]): TuitionFeeResponseDto[] {
  return fees.map(toTuitionFeeResponse);
}
