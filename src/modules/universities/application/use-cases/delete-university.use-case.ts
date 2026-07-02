import { Injectable, NotFoundException } from '@nestjs/common';
import { UniversityRepository } from '../repositories/university.repository';

@Injectable()
export class DeleteUniversityUseCase {
  constructor(private readonly repo: UniversityRepository) {}

  async execute(id: string): Promise<void> {
    const exists = await this.repo.existsById(id);
    if (!exists) {
      throw new NotFoundException(`University with id ${id} not found`);
    }
    await this.repo.delete(id);
  }
}
