import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
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
import { UniversityRepository } from '../../application/repositories/university.repository';
import { CreateUniversityDto } from '../../presentation/dto/create-university.dto';
import { UpdateUniversityDto } from '../../presentation/dto/update-university.dto';
import { ListUniversitiesDto } from '../../presentation/dto/list-universities.dto';
import { getSkip } from '../../../../shared/utils/pagination.util';
import { PaginatedResult } from '../../../../shared/types/api-paginated.type';

@Injectable()
export class TypeOrmUniversityRepository extends UniversityRepository {
  constructor(
    @InjectRepository(University)
    private readonly repo: Repository<University>,
  ) {
    super();
  }

  async create(dto: CreateUniversityDto): Promise<University> {
    const university = this.repo.create(dto as any);
    const saved = await this.repo.save(university);
    return Array.isArray(saved) ? saved[0] : saved;
  }

  async findAll(
    query: ListUniversitiesDto,
  ): Promise<{ data: University[]; total: number }> {
    const page = query.page ?? 1;
    const limit = query.limit ?? 10;
    const skip = getSkip(page, limit);

    const where: any = { isActive: true };

    if (query.search) {
      where.name = ILike(`%${query.search}%`);
    }
    if (query.region) where.region = query.region;
    if (query.governorate) where.governorate = query.governorate;
    if (query.city) where.city = query.city;
    if (query.type) where.type = query.type;

    const [data, total] = await this.repo.findAndCount({
      where,
      skip,
      take: limit,
      order: { createdAt: 'DESC' },
    });

    return { data, total };
  }

  async findById(id: string): Promise<University | null> {
    return this.repo.findOne({
      where: { id },
      relations: {
        faculties: {
          programs: true,
        },
      },
    });
  }

  async update(id: string, dto: UpdateUniversityDto): Promise<University | null> {
    const relationFields = [
      'faculties', 'contacts', 'socialLinks', 'leadership',
      'workingHours', 'images', 'admissionRequirements',
      'tuitionFees', 'scholarships',
      'admissionTimelines', 'campusMoments',
    ];
    const scalarData: Record<string, any> = {};
    const relationData: Record<string, any[]> = {};
    for (const [key, value] of Object.entries(dto)) {
      if (relationFields.includes(key)) {
        if (value !== undefined) relationData[key] = value;
      } else {
        scalarData[key] = value;
      }
    }
    if (Object.keys(scalarData).length > 0) {
      await this.repo.update(id, scalarData as any);
    }
    if (Object.keys(relationData).length > 0) {
      const manager = this.repo.manager;
      const entityMap: Record<string, { entity: new (...args: any[]) => any; fk: string }> = {
        faculties: { entity: Faculty, fk: 'universityId' },
        contacts: { entity: Contact, fk: 'universityId' },
        socialLinks: { entity: SocialLink, fk: 'universityId' },
        leadership: { entity: Leadership, fk: 'universityId' },
        workingHours: { entity: WorkingHour, fk: 'universityId' },
        images: { entity: UniversityImage, fk: 'universityId' },
        admissionRequirements: { entity: AdmissionRequirement, fk: 'universityId' },
        tuitionFees: { entity: TuitionFee, fk: 'universityId' },
        scholarships: { entity: Scholarship, fk: 'universityId' },
        admissionTimelines: { entity: AdmissionTimeline, fk: 'universityId' },
        campusMoments: { entity: CampusMoment, fk: 'universityId' },
      };
      for (const [key, items] of Object.entries(relationData)) {
        const config = entityMap[key];
        if (!config) continue;
        const relationRepo = manager.getRepository(config.entity);
        await relationRepo.delete({ [config.fk]: id });
        if (items.length > 0) {
          const entities = items.map((item: any) => relationRepo.create({ ...item, [config.fk]: id }));
          await relationRepo.save(entities);
        }
      }
    }
    return this.repo.findOne({ where: { id } });
  }

  async delete(id: string): Promise<void> {
    await this.repo.delete(id);
  }

  async existsByName(name: string): Promise<boolean> {
    const count = await this.repo.count({ where: { name } });
    return count > 0;
  }

  async existsById(id: string): Promise<boolean> {
    const count = await this.repo.count({ where: { id } });
    return count > 0;
  }

  async findFacultiesByUniversityId(
    id: string, page: number, limit: number,
  ): Promise<PaginatedResult<Faculty>> {
    const repo = this.repo.manager.getRepository(Faculty);
    const skip = getSkip(page, limit);
    const [data, total] = await repo.findAndCount({
      where: { universityId: id },
      skip,
      take: limit,
      order: { name: 'ASC' },
    });
    return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  async findDepartmentsByFacultyId(
    id: string, page: number, limit: number,
  ): Promise<PaginatedResult<Department>> {
    const repo = this.repo.manager.getRepository(Department);
    const skip = getSkip(page, limit);
    const [data, total] = await repo.findAndCount({
      where: { facultyId: id },
      skip,
      take: limit,
      order: { name: 'ASC' },
    });
    return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  async findSpecializationsByDepartmentId(
    id: string, page: number, limit: number,
  ): Promise<PaginatedResult<Specialization>> {
    const repo = this.repo.manager.getRepository(Specialization);
    const skip = getSkip(page, limit);
    const [data, total] = await repo.findAndCount({
      where: { departmentId: id },
      skip,
      take: limit,
      order: { name: 'ASC' },
    });
    return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  async findGalleryByUniversityId(
    id: string, page: number, limit: number,
  ): Promise<PaginatedResult<UniversityImage>> {
    const repo = this.repo.manager.getRepository(UniversityImage);
    const skip = getSkip(page, limit);
    const [data, total] = await repo.findAndCount({
      where: { universityId: id },
      skip,
      take: limit,
      order: { displayOrder: 'ASC' },
    });
    return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  async findScholarshipsByUniversityId(
    id: string, page: number, limit: number,
  ): Promise<PaginatedResult<Scholarship>> {
    const repo = this.repo.manager.getRepository(Scholarship);
    const skip = getSkip(page, limit);
    const [data, total] = await repo.findAndCount({
      where: { universityId: id },
      skip,
      take: limit,
      order: { name: 'ASC' },
    });
    return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  async findAdmissionRequirementsByUniversityId(
    id: string, page: number, limit: number,
  ): Promise<PaginatedResult<AdmissionRequirement>> {
    const repo = this.repo.manager.getRepository(AdmissionRequirement);
    const skip = getSkip(page, limit);
    const [data, total] = await repo.findAndCount({
      where: { universityId: id },
      skip,
      take: limit,
      order: { displayOrder: 'ASC' },
    });
    return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  async findTuitionFeesByUniversityId(
    id: string, page: number, limit: number,
  ): Promise<PaginatedResult<TuitionFee>> {
    const repo = this.repo.manager.getRepository(TuitionFee);
    const skip = getSkip(page, limit);
    const [data, total] = await repo.findAndCount({
      where: { universityId: id },
      skip,
      take: limit,
      order: { academicYear: 'DESC' },
    });
    return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  async findContactsByUniversityId(id: string): Promise<Contact[]> {
    const repo = this.repo.manager.getRepository(Contact);
    return repo.find({
      where: { universityId: id },
      order: { type: 'ASC' },
    });
  }

  async findSocialLinksByUniversityId(id: string): Promise<SocialLink[]> {
    const repo = this.repo.manager.getRepository(SocialLink);
    return repo.find({
      where: { universityId: id },
      order: { platform: 'ASC' },
    });
  }

  async findLeadershipByUniversityId(id: string): Promise<Leadership[]> {
    const repo = this.repo.manager.getRepository(Leadership);
    return repo.find({
      where: { universityId: id },
      order: { displayOrder: 'ASC' },
    });
  }

  async findWorkingHoursByUniversityId(id: string): Promise<WorkingHour[]> {
    const repo = this.repo.manager.getRepository(WorkingHour);
    return repo.find({
      where: { universityId: id },
      order: { day: 'ASC' as any },
    });
  }

  async findAdmissionTimelinesByUniversityId(id: string): Promise<AdmissionTimeline[]> {
    const repo = this.repo.manager.getRepository(AdmissionTimeline);
    return repo.find({
      where: { universityId: id },
      order: { displayOrder: 'ASC' },
    });
  }

  async findCampusMomentsByUniversityId(id: string): Promise<CampusMoment[]> {
    const repo = this.repo.manager.getRepository(CampusMoment);
    return repo.find({
      where: { universityId: id },
      order: { displayOrder: 'ASC' },
    });
  }

  async findAllRegions(): Promise<string[]> {
    const result = await this.repo
      .createQueryBuilder('u')
      .select('DISTINCT u.region', 'region')
      .orderBy('u.region', 'ASC')
      .getRawMany();
    return result.map((r: any) => r.region);
  }

  async findAllDegreeTypes(): Promise<string[]> {
    return ['Diploma', 'Bachelor', 'Professional Certificate', 'Applied Master Track'];
  }
}
