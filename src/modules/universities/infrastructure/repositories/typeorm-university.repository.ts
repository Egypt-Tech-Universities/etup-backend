import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { University } from '../../domain/entities/university.entity';
import { UniversityRepository } from '../../application/repositories/university.repository';
import { CreateUniversityDto } from '../../presentation/dto/create-university.dto';
import { UpdateUniversityDto } from '../../presentation/dto/update-university.dto';
import { ListUniversitiesDto } from '../../presentation/dto/list-universities.dto';
import { getSkip } from '../../../../shared/utils/pagination.util';

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
          departments: {
            specializations: true,
            careers: true,
          },
        },
        contacts: true,
        socialLinks: true,
        leadership: true,
        workingHours: true,
        images: true,
        admissionRequirements: true,
        tuitionFees: true,
        scholarships: true,
      },
    });
  }

  async update(id: string, dto: UpdateUniversityDto): Promise<University> {
    await this.repo.update(id, dto as any);
    return (await this.findById(id))!;
  }

  async delete(id: string): Promise<void> {
    await this.repo.delete(id);
  }

  async existsByName(name: string): Promise<boolean> {
    const count = await this.repo.count({ where: { name } });
    return count > 0;
  }
}
