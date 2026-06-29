import { Program } from '../../domain/entities/program.entity';
import { CreateProgramDto } from '../dtos/create-program.dto';
import { UpdateProgramDto } from '../dtos/update-program.dto';
import { ListProgramsDto } from '../dtos/list-programs.dto';

export abstract class ProgramRepository {
  abstract create(dto: CreateProgramDto): Promise<Program>;
  abstract findAll(query: ListProgramsDto): Promise<{ data: Program[]; total: number }>;
  abstract findById(id: string): Promise<Program | null>;
  abstract findBySlug(slug: string): Promise<Program | null>;
  abstract update(id: string, dto: UpdateProgramDto): Promise<Program>;
  abstract delete(id: string): Promise<void>;
  abstract existsBySlug(slug: string): Promise<boolean>;
  abstract linkUniversities(programId: string, universityIds: string[]): Promise<Program>;
  abstract unlinkUniversities(programId: string, universityIds: string[]): Promise<Program>;
  abstract findByUniversityId(universityId: string): Promise<Program[]>;
}
