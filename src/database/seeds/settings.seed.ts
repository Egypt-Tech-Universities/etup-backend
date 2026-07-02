import { DataSource } from 'typeorm';
import { SiteSetting } from '../../modules/settings/domain/entities/site-setting.entity';

const SETTINGS_SEED = [
  {
    key: 'footer.about_text',
    value: 'Empowering Egypt\'s future through technological education. Discover your path at one of our innovative universities.',
    type: 'string',
    label: 'About Text (EN)',
    labelAr: 'نص عن الموقع (إنجليزي)',
    displayOrder: 1,
  },
  {
    key: 'footer.about_text_ar',
    value: 'تمكين مستقبل مصر من خلال التعليم التكنولوجي. اكتشف مسارك في إحدى جامعاتنا المبتكرة.',
    type: 'string',
    label: 'About Text (AR)',
    labelAr: 'نص عن الموقع (عربي)',
    displayOrder: 2,
  },
  {
    key: 'footer.contact_info',
    value: JSON.stringify({
      email: 'info@egyptiantechuni.edu.eg',
      phone: '+20 2 1234 5678',
      address: 'Cairo, Egypt',
    }),
    type: 'json',
    label: 'Contact Info',
    labelAr: 'معلومات الاتصال',
    displayOrder: 3,
  },
  {
    key: 'footer.social_links',
    value: JSON.stringify([
      { platform: 'facebook', url: '#', icon: 'facebook' },
      { platform: 'twitter', url: '#', icon: 'twitter' },
      { platform: 'linkedin', url: '#', icon: 'linkedin' },
      { platform: 'youtube', url: '#', icon: 'youtube' },
    ]),
    type: 'json',
    label: 'Social Links',
    labelAr: 'روابط التواصل الاجتماعي',
    displayOrder: 4,
  },
  {
    key: 'footer.links',
    value: JSON.stringify([
      { label: 'Admission Guide', labelAr: 'دليل القبول', url: '#' },
      { label: 'Scholarships', labelAr: 'المنح الدراسية', url: '#' },
      { label: 'FAQs', labelAr: 'الأسئلة الشائعة', url: '#' },
      { label: 'Contact Us', labelAr: 'اتصل بنا', url: '#' },
      { label: 'Privacy Policy', labelAr: 'سياسة الخصوصية', url: '#' },
    ]),
    type: 'json',
    label: 'Quick Links',
    labelAr: 'روابط سريعة',
    displayOrder: 5,
  },
];

export async function seedSettings(dataSource: DataSource) {
  const repo = dataSource.getRepository(SiteSetting);
  const count = await repo.count();
  if (count > 0) {
    console.log('ℹ️  Settings already exist. Skipping...');
    return;
  }
  for (const s of SETTINGS_SEED) {
    await repo.save(repo.create(s));
  }
  console.log(`✅ ${SETTINGS_SEED.length} site settings seeded`);
}
