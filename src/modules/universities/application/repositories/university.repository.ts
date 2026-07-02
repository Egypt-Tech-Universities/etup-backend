import { University } from '../../domain/entities/university.entity';
import { Faculty } from '../../domain/entities/faculty.entity';
import { Department } from '../../domain/entities/department.entity';
import { Specialization } from '../../domain/entities/specialization.entity';
import { Contact } from '../../domain/entities/contact.entity';
import { SocialLink } from '../../domain/entities/social-link.entity';
import { Leadership } from '../../domain/entities/leadership.entity';
import { WorkingHour } from '../../domain/entities/working-hour.entity';
import { UniversityImage } from '../../domain/entities/university-image.entity';
import { AdmissionRequirement } from '../../domain/entities/admission-requirement.entity';
import { TuitionFee } from '../../domain/entities/tuition-fee.entity';
import { Scholarship } from '../../domain/entities/scholarship.entity';
import { AdmissionTimeline } from '../../domain/entities/admission-timeline.entity';
import { CampusMoment } from '../../domain/entities/campus-moment.entity';
import { CreateUniversityDto } from '../../presentation/dto/create-university.dto';
import { UpdateUniversityDto } from '../../presentation/dto/update-university.dto';
import { ListUniversitiesDto } from '../../presentation/dto/list-universities.dto';
import { PaginatedResult } from '../../../../shared/types/api-paginated.type';

export abstract class UniversityRepository {
  abstract create(dto: CreateUniversityDto): Promise<University>;
  abstract findAll(query: ListUniversitiesDto): Promise<{ data: University[]; total: number }>;
  abstract findById(id: string): Promise<University | null>;
  abstract update(id: string, dto: UpdateUniversityDto): Promise<University | null>;
  abstract delete(id: string): Promise<void>;
  abstract existsByName(name: string): Promise<boolean>;
  abstract existsById(id: string): Promise<boolean>;

  abstract findFacultiesByUniversityId(
    id: string, page: number, limit: number,
  ): Promise<PaginatedResult<Faculty>>;

  abstract findDepartmentsByFacultyId(
    id: string, page: number, limit: number,
  ): Promise<PaginatedResult<Department>>;

  abstract findSpecializationsByDepartmentId(
    id: string, page: number, limit: number,
  ): Promise<PaginatedResult<Specialization>>;

  abstract findGalleryByUniversityId(
    id: string, page: number, limit: number,
  ): Promise<PaginatedResult<UniversityImage>>;

  abstract findScholarshipsByUniversityId(
    id: string, page: number, limit: number,
  ): Promise<PaginatedResult<Scholarship>>;

  abstract findAdmissionRequirementsByUniversityId(
    id: string, page: number, limit: number,
  ): Promise<PaginatedResult<AdmissionRequirement>>;

  abstract findTuitionFeesByUniversityId(
    id: string, page: number, limit: number,
  ): Promise<PaginatedResult<TuitionFee>>;

  abstract findContactsByUniversityId(id: string): Promise<Contact[]>;
  abstract findSocialLinksByUniversityId(id: string): Promise<SocialLink[]>;
  abstract findLeadershipByUniversityId(id: string): Promise<Leadership[]>;
  abstract findWorkingHoursByUniversityId(id: string): Promise<WorkingHour[]>;

  abstract findAdmissionTimelinesByUniversityId(id: string): Promise<AdmissionTimeline[]>;

  abstract findCampusMomentsByUniversityId(id: string): Promise<CampusMoment[]>;

  abstract findAllRegions(): Promise<string[]>;

  abstract findAllDegreeTypes(): Promise<string[]>;
}
