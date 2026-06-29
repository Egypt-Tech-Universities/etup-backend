import { Injectable, NotFoundException } from '@nestjs/common';
import { ProgramRepository } from '../repositories/program.repository';

@Injectable()
export class GetProgramBySlugUseCase {
  constructor(private readonly repo: ProgramRepository) {}

  async execute(slug: string) {
    const program = await this.repo.findBySlug(slug);
    if (!program) throw new NotFoundException(`Program "${slug}" not found`);
    return program;
  }
}
