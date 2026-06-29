export class UniversityResponseDto {
  id: string;
  name: string;
  nameAr: string;
  logo: string;
  region: string;
  location: {
    governorate: string;
    city: string;
    coordinates: { lat: number; lng: number };
  };
  president: {
    name: string;
    image: string;
    bio: string;
  };
  stats: {
    students: number;
    faculty: number;
    programs: number;
    accreditation: string[];
  };
  degreeTypes: string[];
  facilities: string[];
  tuitionRange: {
    min: number;
    max: number;
  };
  programs: string[];
  industryPartners: string[];
  description: string;
  gallery: string[];
  established: number;
  website: string;
}
