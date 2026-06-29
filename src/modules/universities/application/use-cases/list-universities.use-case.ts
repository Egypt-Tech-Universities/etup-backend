import { Injectable } from '@nestjs/common';
import { UniversityRepository } from '../repositories/university.repository';
import { ListUniversitiesDto } from '../../presentation/dto/list-universities.dto';

@Injectable()
export class ListUniversitiesUseCase {
  constructor(private readonly repo: UniversityRepository) {}

  async execute(query: ListUniversitiesDto) {
    return this.repo.findAll(query);
  }
}
