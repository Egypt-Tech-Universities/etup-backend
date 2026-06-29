import { NotificationPreference } from '../../domain/entities/notification-preference.entity';
import { UpdatePreferencesDto } from '../dtos/update-preferences.dto';

export abstract class PreferenceRepository {
  abstract findOrCreate(userId: string): Promise<NotificationPreference>;
  abstract update(userId: string, dto: UpdatePreferencesDto): Promise<NotificationPreference>;
  abstract isEnabled(userId: string, field: keyof NotificationPreference): Promise<boolean>;
}
