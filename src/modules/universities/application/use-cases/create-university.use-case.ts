import { ConflictException, Injectable } from '@nestjs/common';
import { UniversityRepository } from '../repositories/university.repository';
import { CreateUniversityDto } from '../../presentation/dto/create-university.dto';
import { University } from '../../domain/entities/university.entity';

@Injectable()
export class CreateUniversityUseCase {
  constructor(private readonly repo: UniversityRepository) {}

  async execute(dto: CreateUniversityDto): Promise<University> {
    const exists = await this.repo.existsByName(dto.name);
    if (exists) {
      throw new ConflictException(`University with name "${dto.name}" already exists`);
    }
    return this.repo.create(dto);
  }
}
