import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, In, Repository } from 'typeorm';
import { Program } from '../../domain/entities/program.entity';
import { ProgramRepository } from '../../application/repositories/program.repository';
import { CreateProgramDto } from '../../application/dtos/create-program.dto';
import { UpdateProgramDto } from '../../application/dtos/update-program.dto';
import { ListProgramsDto } from '../../application/dtos/list-programs.dto';
import { University } from '../../../universities/domain/entities/university.entity';
import { getSkip } from '../../../../shared/utils/pagination.util';

@Injectable()
export class TypeOrmProgramRepository extends ProgramRepository {
  constructor(
    @InjectRepository(Program)
    private readonly repo: Repository<Program>,
    @InjectRepository(University)
    private readonly uniRepo: Repository<University>,
  ) {
    super();
  }

  async create(dto: CreateProgramDto): Promise<Program> {
    const { universityIds, ...rest } = dto;

    const program = this.repo.create(rest as any);

    // Attach universities if provided
    if (universityIds && universityIds.length > 0) {
      const universities = await this.uniRepo.find({
        where: { id: In(universityIds) },
      });
      (program as any).universities = universities;
    }

    const saved = await this.repo.save(program);
    return Array.isArray(saved) ? saved[0] : saved;
  }

  async findAll(query: ListProgramsDto): Promise<{ data: Program[]; total: number }> {
    const page = query.page ?? 1;
    const limit = query.limit ?? 10;
    const skip = getSkip(page, limit);

    const qb = this.repo
      .createQueryBuilder('program')
      .leftJoinAndSelect('program.universities', 'university')
      .where('program.isActive = :isActive', { isActive: true });

    if (query.search) {
      qb.andWhere('program.name ILIKE :search', { search: `%${query.search}%` });
    }
    if (query.category) qb.andWhere('program.category = :category', { category: query.category });
    if (query.degreeLevel) qb.andWhere('program.degreeLevel = :dl', { dl: query.degreeLevel });
    if (query.language) qb.andWhere('program.language = :lang', { lang: query.language });
    if (query.isFeatured) qb.andWhere('program.isFeatured = :ft', { ft: query.isFeatured });

    if (query.universityId) {
      qb.andWhere('university.id = :uniId', { uniId: query.universityId });
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
        universities: true,
        highlights: true,
        outcomes: true,
      },
    });
  }

  async findBySlug(slug: string): Promise<Program | null> {
    return this.repo.findOne({
      where: { slug },
      relations: {
        universities: true,
        highlights: true,
        outcomes: true,
      },
    });
  }

  async update(id: string, dto: UpdateProgramDto): Promise<Program> {
    const { universityIds, highlights, outcomes, ...rest } = dto;

    await this.repo.update(id, rest as any);

    if (universityIds !== undefined) {
      const program = await this.repo.findOne({
        where: { id },
        relations: { universities: true },
      });
      if (program) {
        const universities = await this.uniRepo.find({
          where: { id: In(universityIds) },
        });
        program.universities = universities;
        await this.repo.save(program);
      }
    }

    return (await this.findById(id))!;
  }

  async delete(id: string): Promise<void> {
    await this.repo.delete(id);
  }

  async existsBySlug(slug: string): Promise<boolean> {
    const count = await this.repo.count({ where: { slug } });
    return count > 0;
  }

  async linkUniversities(programId: string, universityIds: string[]): Promise<Program> {
    const program = await this.repo.findOne({
      where: { id: programId },
      relations: { universities: true },
    });
    if (!program) throw new Error('Program not found');

    const newUnis = await this.uniRepo.find({ where: { id: In(universityIds) } });
    const existingIds = program.universities.map((u) => u.id);
    const toAdd = newUnis.filter((u) => !existingIds.includes(u.id));

    program.universities = [...program.universities, ...toAdd];
    await this.repo.save(program);

    return (await this.findById(programId))!;
  }

  async unlinkUniversities(programId: string, universityIds: string[]): Promise<Program> {
    const program = await this.repo.findOne({
      where: { id: programId },
      relations: { universities: true },
    });
    if (!program) throw new Error('Program not found');

    program.universities = program.universities.filter(
      (u) => !universityIds.includes(u.id),
    );
    await this.repo.save(program);

    return (await this.findById(programId))!;
  }

  async findByUniversityId(universityId: string): Promise<Program[]> {
    return this.repo
      .createQueryBuilder('program')
      .leftJoinAndSelect('program.universities', 'university')
      .leftJoinAndSelect('program.highlights', 'highlights')
      .leftJoinAndSelect('program.outcomes', 'outcomes')
      .where('university.id = :uniId', { uniId: universityId })
      .andWhere('program.isActive = :isActive', { isActive: true })
      .orderBy('program.isFeatured', 'DESC')
      .getMany();
  }
}
