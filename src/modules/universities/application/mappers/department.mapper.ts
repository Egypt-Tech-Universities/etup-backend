import { Department } from '../../domain/entities/department.entity';
import { DepartmentResponseDto } from '../../presentation/dto/department-response.dto';

export function toDepartmentResponse(dept: Department): DepartmentResponseDto {
  return {
    id: dept.id,
    name: dept.name,
    nameAr: dept.nameAr || '',
    overview: dept.overview || '',
    overviewAr: dept.overviewAr || '',
    coordinator: dept.coordinator || '',
    facultyId: dept.facultyId,
  };
}

export function toDepartmentResponseList(depts: Department[]): DepartmentResponseDto[] {
  return depts.map(toDepartmentResponse);
}
