import { Faculty } from '../../domain/entities/faculty.entity';
import { FacultyResponseDto } from '../../presentation/dto/faculty-response.dto';

export function toFacultyResponse(faculty: Faculty): FacultyResponseDto {
  return {
    id: faculty.id,
    name: faculty.name,
    nameAr: faculty.nameAr || '',
    description: faculty.description || '',
    dean: faculty.dean || '',
    imageUrl: faculty.imageUrl || '',
  };
}

export function toFacultyResponseList(faculties: Faculty[]): FacultyResponseDto[] {
  return faculties.map(toFacultyResponse);
}
