import { Injectable } from '@nestjs/common';
import { SettingsRepository } from '../repositories/settings.repository';

@Injectable()
export class GetFooterSettingsUseCase {
  constructor(private readonly repo: SettingsRepository) {}

  async execute(): Promise<Record<string, any>> {
    const settings = await this.repo.findByGroup('footer');

    const result: Record<string, any> = {
      socialLinks: [],
      contactInfo: {},
      links: [],
      aboutText: '',
      aboutTextAr: '',
    };

    for (const s of settings) {
      switch (s.key) {
        case 'footer.social_links':
          try { result.socialLinks = JSON.parse(s.value); } catch { result.socialLinks = []; }
          break;
        case 'footer.contact_info':
          try { result.contactInfo = JSON.parse(s.value); } catch { result.contactInfo = {}; }
          break;
        case 'footer.links':
          try { result.links = JSON.parse(s.value); } catch { result.links = []; }
          break;
        case 'footer.about_text':
          result.aboutText = s.value || '';
          break;
        case 'footer.about_text_ar':
          result.aboutTextAr = s.value || '';
          break;
      }
    }

    return result;
  }
}
