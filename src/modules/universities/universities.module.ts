import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { University } from './domain/entities/university.entity';
import { Faculty } from './domain/entities/faculty.entity';
import { Department } from './domain/entities/department.entity';
import { Specialization } from './domain/entities/specialization.entity';
import { CareerOpportunity } from './domain/entities/career-opportunity.entity';
import { Contact } from './domain/entities/contact.entity';
import { SocialLink } from './domain/entities/social-link.entity';
import { Leadership } from './domain/entities/leadership.entity';
import { WorkingHour } from './domain/entities/working-hour.entity';
import { UniversityImage } from './domain/entities/university-image.entity';
import { AdmissionRequirement } from './domain/entities/admission-requirement.entity';
import { TuitionFee } from './domain/entities/tuition-fee.entity';
import { Scholarship } from './domain/entities/scholarship.entity';
import { AdmissionTimeline } from './domain/entities/admission-timeline.entity';
import { CampusMoment } from './domain/entities/campus-moment.entity';

import { UniversitiesController } from './presentation/universities.controller';
import { FacultiesController } from './presentation/faculties.controller';
import { DepartmentsController } from './presentation/departments.controller';
import { UniversityRepository } from './application/repositories/university.repository';
import { TypeOrmUniversityRepository } from './infrastructure/repositories/typeorm-university.repository';

import { CreateUniversityUseCase } from './application/use-cases/create-university.use-case';
import { ListUniversitiesUseCase } from './application/use-cases/list-universities.use-case';
import { GetUniversityByIdUseCase } from './application/use-cases/get-university-by-id.use-case';
import { UpdateUniversityUseCase } from './application/use-cases/update-university.use-case';
import { DeleteUniversityUseCase } from './application/use-cases/delete-university.use-case';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      University,
      Faculty,
      Department,
      Specialization,
      CareerOpportunity,
      Contact,
      SocialLink,
      Leadership,
      WorkingHour,
      UniversityImage,
      AdmissionRequirement,
      TuitionFee,
      Scholarship,
      AdmissionTimeline,
      CampusMoment,
    ]),
  ],
  controllers: [UniversitiesController, FacultiesController, DepartmentsController],
  providers: [
    {
      provide: UniversityRepository,
      useClass: TypeOrmUniversityRepository,
    },
    CreateUniversityUseCase,
    ListUniversitiesUseCase,
    GetUniversityByIdUseCase,
    UpdateUniversityUseCase,
    DeleteUniversityUseCase,
  ],
  exports: [UniversityRepository],
})
export class UniversitiesModule {}
