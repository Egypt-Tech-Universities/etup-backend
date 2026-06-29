import { Injectable, NotFoundException } from '@nestjs/common';
import { ProgramRepository } from '../repositories/program.repository';

@Injectable()
export class DeleteProgramUseCase {
  constructor(private readonly repo: ProgramRepository) {}

  async execute(id: string): Promise<void> {
    const exists = await this.repo.findById(id);
    if (!exists) throw new NotFoundException(`Program ${id} not found`);
    await this.repo.delete(id);
  }
}
