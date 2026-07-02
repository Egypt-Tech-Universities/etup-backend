import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Program } from './domain/entities/program.entity';
import { ProgramHighlight } from './domain/entities/program-highlight.entity';
import { ProgramOutcome } from './domain/entities/program-outcome.entity';

import { ProgramsController } from './presentation/programs.controller';
import { ProgramRepository } from './application/repositories/program.repository';
import { TypeOrmProgramRepository } from './infrastructure/repositories/typeorm-program.repository';

import { CreateProgramUseCase } from './application/use-cases/create-program.use-case';
import { ListProgramsUseCase } from './application/use-cases/list-programs.use-case';
import { GetProgramByIdUseCase } from './application/use-cases/get-program-by-id.use-case';
import { GetProgramBySlugUseCase } from './application/use-cases/get-program-by-slug.use-case';
import { GetProgramsByUniversityUseCase } from './application/use-cases/get-programs-by-university.use-case';
import { UpdateProgramUseCase } from './application/use-cases/update-program.use-case';
import { DeleteProgramUseCase } from './application/use-cases/delete-program.use-case';

@Module({
  imports: [
    TypeOrmModule.forFeature([Program, ProgramHighlight, ProgramOutcome]),
  ],
  controllers: [ProgramsController],
  providers: [
    { provide: ProgramRepository, useClass: TypeOrmProgramRepository },
    CreateProgramUseCase,
    ListProgramsUseCase,
    GetProgramByIdUseCase,
    GetProgramBySlugUseCase,
    GetProgramsByUniversityUseCase,
    UpdateProgramUseCase,
    DeleteProgramUseCase,
  ],
  exports: [ProgramRepository],
})
export class ProgramsModule {}
