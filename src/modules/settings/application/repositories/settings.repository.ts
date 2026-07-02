import { SiteSetting } from '../../domain/entities/site-setting.entity';

export abstract class SettingsRepository {
  abstract findByGroup(keyPrefix: string): Promise<SiteSetting[]>;
  abstract findByKey(key: string): Promise<SiteSetting | null>;
}
