import { Injectable, NotFoundException } from '@nestjs/common';
import { UniversityRepository } from '../repositories/university.repository';
import { UpdateUniversityDto } from '../../presentation/dto/update-university.dto';

@Injectable()
export class UpdateUniversityUseCase {
  constructor(private readonly repo: UniversityRepository) {}

  async execute(id: string, dto: UpdateUniversityDto) {
    const exists = await this.repo.existsById(id);
    if (!exists) {
      throw new NotFoundException(`University with id ${id} not found`);
    }
    return this.repo.update(id, dto);
  }
}
