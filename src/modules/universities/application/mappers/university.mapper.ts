import { University } from '../../domain/entities/university.entity';
import { UniversityResponseDto } from '../../presentation/dto/university-response.dto';

export function toUniversityResponse(uni: University): UniversityResponseDto {
  return {
    id: uni.id,
    name: uni.name,
    nameAr: uni.nameAr || '',
    abbreviation: uni.abbreviation || '',
    logo: uni.logoUrl || '',
    coverImage: uni.coverImageUrl || '',
    region: uni.region,
    location: {
      governorate: uni.governorate,
      city: uni.city,
      address: uni.address || '',
      coordinates: {
        lat: uni.latitude ? Number(uni.latitude) : 0,
        lng: uni.longitude ? Number(uni.longitude) : 0,
      },
    },
    description: uni.description,
    descriptionAr: uni.descriptionAr || '',
    established: uni.established,
    type: uni.type,
    website: uni.website || '',
    vision: uni.vision || '',
    visionAr: uni.visionAr || '',
    mission: uni.mission || '',
    missionAr: uni.missionAr || '',
    coreValues: uni.coreValues || '',
    coreValuesAr: uni.coreValuesAr || '',
    tuitionMin: uni.tuitionMin || 0,
    tuitionMax: uni.tuitionMax || 0,
    applicationLink: uni.applicationLink || '',
    totalStudents: uni.totalStudents || 0,
    totalFaculty: uni.totalFaculty || 0,
    totalPrograms: uni.totalPrograms || 0,
  };
}

export function toUniversityResponseList(universities: University[]): UniversityResponseDto[] {
  return universities.map(toUniversityResponse);
}
