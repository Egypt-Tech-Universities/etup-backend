import { Injectable } from '@nestjs/common';
import { PreferenceRepository } from '../repositories/preference.repository';
import { UpdatePreferencesDto } from '../dtos/update-preferences.dto';

@Injectable()
export class GetPreferencesUseCase {
  constructor(private readonly repo: PreferenceRepository) {}
  execute(userId: string) {
    return this.repo.findOrCreate(userId);
  }
}

@Injectable()
export class UpdatePreferencesUseCase {
  constructor(private readonly repo: PreferenceRepository) {}
  execute(userId: string, dto: UpdatePreferencesDto) {
    return this.repo.update(userId, dto);
  }
}
