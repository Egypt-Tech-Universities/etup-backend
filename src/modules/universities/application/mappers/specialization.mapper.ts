import { Specialization } from '../../domain/entities/specialization.entity';
import { SpecializationResponseDto } from '../../presentation/dto/specialization-response.dto';

export function toSpecializationResponse(spec: Specialization): SpecializationResponseDto {
  return {
    id: spec.id,
    name: spec.name,
    nameAr: spec.nameAr || '',
    icon: spec.icon || '',
    description: spec.description || '',
  };
}

export function toSpecializationResponseList(specs: Specialization[]): SpecializationResponseDto[] {
  return specs.map(toSpecializationResponse);
}
