import { Injectable, NotFoundException } from '@nestjs/common';
import { UniversityRepository } from '../repositories/university.repository';

@Injectable()
export class GetUniversityByIdUseCase {
  constructor(private readonly repo: UniversityRepository) {}

  async execute(id: string) {
    const uni = await this.repo.findById(id);
    if (!uni) {
      throw new NotFoundException(`University with id ${id} not found`);
    }
    return uni;
  }
}
