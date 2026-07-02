import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { Program } from '../../domain/entities/program.entity';
import { ProgramRepository } from '../../application/repositories/program.repository';
import { CreateProgramDto } from '../../application/dtos/create-program.dto';
import { UpdateProgramDto } from '../../application/dtos/update-program.dto';
import { ListProgramsDto } from '../../application/dtos/list-programs.dto';
import { getSkip } from '../../../../shared/utils/pagination.util';

@Injectable()
export class TypeOrmProgramRepository extends ProgramRepository {
  constructor(
    @InjectRepository(Program)
    private readonly repo: Repository<Program>,
  ) {
    super();
  }

  async create(dto: CreateProgramDto): Promise<Program> {
    const { highlights, outcomes, ...rest } = dto;

    const program = this.repo.create(rest as any);

    const saved = await this.repo.save(program);
    return Array.isArray(saved) ? saved[0] : saved;
  }

  async findAll(query: ListProgramsDto): Promise<{ data: Program[]; total: number }> {
    const page = query.page ?? 1;
    const limit = query.limit ?? 10;
    const skip = getSkip(page, limit);

    const qb = this.repo
      .createQueryBuilder('program')
      .leftJoinAndSelect('program.faculty', 'faculty')
      .where('program.isActive = :isActive', { isActive: true });

    if (query.search) {
      qb.andWhere('program.name ILIKE :search', { search: `%${query.search}%` });
    }
    if (query.category) qb.andWhere('program.category = :category', { category: query.category });
    if (query.degreeLevel) qb.andWhere('program.degreeLevel = :dl', { dl: query.degreeLevel });
    if (query.language) qb.andWhere('program.language = :lang', { lang: query.language });
    if (query.isFeatured) qb.andWhere('program.isFeatured = :ft', { ft: query.isFeatured });

    if (query.universityId) {
      qb.andWhere('faculty.universityId = :uniId', { uniId: query.universityId });
    }

    qb.orderBy('program.isFeatured', 'DESC')
      .addOrderBy('program.createdAt', 'DESC')
      .skip(skip)
      .take(limit);

    const [data, total] = await qb.getManyAndCount();
    return { data, total };
  }

  async findById(id: string): Promise<Program | null> {
    return this.repo.findOne({
      where: { id },
      relations: {
        faculty: true,
        highlights: true,
        outcomes: true,
      },
    });
  }

  async findBySlug(slug: string): Promise<Program | null> {
    return this.repo.findOne({
      where: { slug },
      relations: {
        faculty: true,
        highlights: true,
        outcomes: true,
      },
    });
  }

  async update(id: string, dto: UpdateProgramDto): Promise<Program> {
    const { highlights, outcomes, ...rest } = dto;

    await this.repo.update(id, rest as any);

    return (await this.findById(id))!;
  }

  async delete(id: string): Promise<void> {
    await this.repo.delete(id);
  }

  async existsBySlug(slug: string): Promise<boolean> {
    const count = await this.repo.count({ where: { slug } });
    return count > 0;
  }

  async findByUniversityId(universityId: string): Promise<Program[]> {
    return this.repo
      .createQueryBuilder('program')
      .leftJoinAndSelect('program.faculty', 'faculty')
      .leftJoinAndSelect('program.highlights', 'highlights')
      .leftJoinAndSelect('program.outcomes', 'outcomes')
      .where('faculty.universityId = :uniId', { uniId: universityId })
      .andWhere('program.isActive = :isActive', { isActive: true })
      .orderBy('program.isFeatured', 'DESC')
      .getMany();
  }
}
