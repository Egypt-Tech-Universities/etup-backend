import { Injectable, NotFoundException } from '@nestjs/common';
import { ProgramRepository } from '../repositories/program.repository';
import { UpdateProgramDto } from '../dtos/update-program.dto';

@Injectable()
export class UpdateProgramUseCase {
  constructor(private readonly repo: ProgramRepository) {}

  async execute(id: string, dto: UpdateProgramDto) {
    const exists = await this.repo.findById(id);
    if (!exists) throw new NotFoundException(`Program ${id} not found`);
    return this.repo.update(id, dto);
  }
}
