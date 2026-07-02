import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { SiteSetting } from '../../domain/entities/site-setting.entity';
import { SettingsRepository } from '../../application/repositories/settings.repository';

@Injectable()
export class TypeOrmSettingsRepository extends SettingsRepository {
  constructor(
    @InjectRepository(SiteSetting)
    private readonly repo: Repository<SiteSetting>,
  ) {
    super();
  }

  async findByGroup(keyPrefix: string): Promise<SiteSetting[]> {
    return this.repo.find({
      where: { key: ILike(`${keyPrefix}%`) },
      order: { displayOrder: 'ASC' },
    });
  }

  async findByKey(key: string): Promise<SiteSetting | null> {
    return this.repo.findOne({ where: { key } });
  }
}
