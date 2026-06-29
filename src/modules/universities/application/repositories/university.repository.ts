import { University } from '../../domain/entities/university.entity';
import { CreateUniversityDto } from '../../presentation/dto/create-university.dto';
import { UpdateUniversityDto } from '../../presentation/dto/update-university.dto';
import { ListUniversitiesDto } from '../../presentation/dto/list-universities.dto';

export abstract class UniversityRepository {
  abstract create(dto: CreateUniversityDto): Promise<University>;
  abstract findAll(query: ListUniversitiesDto): Promise<{ data: University[]; total: number }>;
  abstract findById(id: string): Promise<University | null>;
  abstract update(id: string, dto: UpdateUniversityDto): Promise<University>;
  abstract delete(id: string): Promise<void>;
  abstract existsByName(name: string): Promise<boolean>;
}
