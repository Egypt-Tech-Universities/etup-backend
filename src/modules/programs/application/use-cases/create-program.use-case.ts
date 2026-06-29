import { ConflictException, Injectable } from '@nestjs/common';
import { ProgramRepository } from '../repositories/program.repository';
import { CreateProgramDto } from '../dtos/create-program.dto';
import { generateSlug } from '../../../../shared/utils/slug.util';

@Injectable()
export class CreateProgramUseCase {
  constructor(private readonly repo: ProgramRepository) {}

  async execute(dto: CreateProgramDto) {
    if (!dto.slug) {
      dto.slug = generateSlug(dto.name);
    }

    const exists = await this.repo.existsBySlug(dto.slug);
    if (exists) {
      throw new ConflictException(`Program with slug "${dto.slug}" already exists`);
    }

    return this.repo.create(dto);
  }
}
