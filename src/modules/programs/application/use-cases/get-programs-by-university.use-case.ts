import { Injectable } from '@nestjs/common';
import { ProgramRepository } from '../repositories/program.repository';

@Injectable()
export class GetProgramsByUniversityUseCase {
  constructor(private readonly repo: ProgramRepository) {}

  async execute(universityId: string) {
    return this.repo.findByUniversityId(universityId);
  }
}
