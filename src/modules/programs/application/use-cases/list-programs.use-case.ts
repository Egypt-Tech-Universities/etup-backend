import { Injectable } from '@nestjs/common';
import { ProgramRepository } from '../repositories/program.repository';
import { ListProgramsDto } from '../dtos/list-programs.dto';

@Injectable()
export class ListProgramsUseCase {
  constructor(private readonly repo: ProgramRepository) {}

  async execute(query: ListProgramsDto) {
    return this.repo.findAll(query);
  }
}
