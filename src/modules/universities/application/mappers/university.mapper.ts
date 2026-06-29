import { University } from '../../domain/entities/university.entity';
import { UniversityResponseDto } from '../../presentation/dto/university-response.dto';

function extractSpecializations(faculties: University['faculties']): string[] {
  if (!faculties) return [];
  const set = new Set<string>();
  for (const f of faculties) {
    if (f.departments) {
      for (const d of f.departments) {
        set.add(d.name);
        if (d.specializations) {
          for (const s of d.specializations) {
            set.add(s.name);
          }
        }
      }
    }
  }
  return Array.from(set).sort();
}

function computeStats(faculties: University['faculties']) {
  if (!faculties) {
    return { students: 0, faculty: 0, programs: 0, accreditation: [] };
  }
  const specs = extractSpecializations(faculties);
  const deptCount = faculties.reduce((sum, f) => {
    return sum + (f.departments ? f.departments.length : 0);
  }, 0);
  return {
    students: 0,
    faculty: deptCount || faculties.length,
    programs: specs.length,
    accreditation: [],
  };
}

export function toUniversityResponse(uni: University): UniversityResponseDto {
  const programs = extractSpecializations(uni.faculties);
  const president = uni.leadership && uni.leadership.length > 0
    ? { name: uni.leadership[0].name, image: uni.leadership[0].imageUrl || '', bio: '' }
    : { name: '', image: '', bio: '' };

  return {
    id: uni.id,
    name: uni.name,
    nameAr: uni.nameAr || '',
    logo: uni.logoUrl || '',
    region: uni.region,
    location: {
      governorate: uni.governorate,
      city: uni.city,
      coordinates: {
        lat: uni.latitude ? Number(uni.latitude) : 0,
        lng: uni.longitude ? Number(uni.longitude) : 0,
      },
    },
    president,
    stats: computeStats(uni.faculties),
    degreeTypes: programs.length > 0 ? ['Bachelor'] : [],
    facilities: [],
    tuitionRange: {
      min: uni.tuitionMin || 0,
      max: uni.tuitionMax || 0,
    },
    programs,
    industryPartners: [],
    description: uni.description,
    gallery: uni.images ? uni.images.map((img) => img.imageUrl || '') : [],
    established: uni.established,
    website: uni.website || '',
  };
}

export function toUniversityResponseList(universities: University[]): UniversityResponseDto[] {
  return universities.map(toUniversityResponse);
}
