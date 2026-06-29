import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotificationPreference } from '../../domain/entities/notification-preference.entity';
import { PreferenceRepository } from '../../application/repositories/preference.repository';
import { UpdatePreferencesDto } from '../../application/dtos/update-preferences.dto';

@Injectable()
export class TypeOrmPreferenceRepository extends PreferenceRepository {
  constructor(
    @InjectRepository(NotificationPreference)
    private readonly repo: Repository<NotificationPreference>,
  ) {
    super();
  }

  async findOrCreate(userId: string): Promise<NotificationPreference> {
    let pref = await this.repo.findOne({ where: { userId } });
    if (!pref) {
      pref = this.repo.create({ userId });
      pref = await this.repo.save(pref);
    }
    return pref;
  }

  async update(userId: string, dto: UpdatePreferencesDto): Promise<NotificationPreference> {
    const pref = await this.findOrCreate(userId);
    Object.assign(pref, dto);
    return this.repo.save(pref);
  }

  async isEnabled(userId: string, field: keyof NotificationPreference): Promise<boolean> {
    const pref = await this.findOrCreate(userId);
    return Boolean(pref[field]);
  }
}
