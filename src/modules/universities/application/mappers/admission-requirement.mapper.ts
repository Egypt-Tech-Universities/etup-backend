import { AdmissionRequirement } from '../../domain/entities/admission-requirement.entity';
import { AdmissionRequirementResponseDto } from '../../presentation/dto/admission-requirement-response.dto';

export function toAdmissionRequirementResponse(req: AdmissionRequirement): AdmissionRequirementResponseDto {
  return {
    id: req.id,
    type: req.type,
    description: req.description,
    descriptionAr: req.descriptionAr || '',
    displayOrder: req.displayOrder,
  };
}

export function toAdmissionRequirementResponseList(reqs: AdmissionRequirement[]): AdmissionRequirementResponseDto[] {
  return reqs.map(toAdmissionRequirementResponse);
}
