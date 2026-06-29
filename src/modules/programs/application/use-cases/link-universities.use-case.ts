import { Injectable, NotFoundException } from '@nestjs/common';
import { ProgramRepository } from '../repositories/program.repository';

@Injectable()
export class LinkUniversitiesUseCase {
  constructor(private readonly repo: ProgramRepository) {}

  async execute(programId: string, universityIds: string[]) {
    const exists = await this.repo.findById(programId);
    if (!exists) throw new NotFoundException(`Program ${programId} not found`);
    return this.repo.linkUniversities(programId, universityIds);
  }
}
