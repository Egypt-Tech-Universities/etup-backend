export class UniversityResponseDto {
  id: string;
  name: string;
  nameAr: string;
  abbreviation: string;
  logo: string;
  coverImage: string;
  region: string;
  location: {
    governorate: string;
    city: string;
    address: string;
    coordinates: { lat: number; lng: number };
  };
  description: string;
  descriptionAr: string;
  established: number;
  type: string;
  website: string;
  vision: string;
  visionAr: string;
  mission: string;
  missionAr: string;
  coreValues: string;
  coreValuesAr: string;
  tuitionMin: number;
  tuitionMax: number;
  applicationLink: string;
  totalStudents: number;
  totalFaculty: number;
  totalPrograms: number;
}
