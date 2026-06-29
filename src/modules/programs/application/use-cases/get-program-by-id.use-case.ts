import { Injectable, NotFoundException } from '@nestjs/common';
import { ProgramRepository } from '../repositories/program.repository';

@Injectable()
export class GetProgramByIdUseCase {
  constructor(private readonly repo: ProgramRepository) {}

  async execute(id: string) {
    const program = await this.repo.findById(id);
    if (!program) throw new NotFoundException(`Program ${id} not found`);
    return program;
  }
}
