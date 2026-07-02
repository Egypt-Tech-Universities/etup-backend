import { DataSource } from 'typeorm';
import { AdmissionTimeline } from '../../modules/universities/domain/entities/admission-timeline.entity';
import { CampusMoment } from '../../modules/universities/domain/entities/campus-moment.entity';

const TIMELINE_TEMPLATE = [
  { title: 'Applications Open', titleAr: 'فتح التقديم', detail: 'Submit core documents and rank preferred programs.', detailAr: 'رفع المستندات الأساسية واختيار البرامج.', displayOrder: 1 },
  { title: 'Academic Review', titleAr: 'المراجعة الأكاديمية', detail: 'Eligibility, grades, and file review by admissions teams.', detailAr: 'التحقق من الدرجات والملفات المطلوبة.', displayOrder: 2 },
  { title: 'Practical Assessment', titleAr: 'التقييم العملي', detail: 'Short interview or technical screening depending on program.', detailAr: 'اختبار أو مقابلة قصيرة حسب البرنامج.', displayOrder: 3 },
  { title: 'Offer Confirmation', titleAr: 'تأكيد القبول', detail: 'Confirm seat allocation and complete first payment steps.', detailAr: 'تأكيد المقعد وسداد الدفعة الأولى.', displayOrder: 4 },
];

const MOMENTS_TEMPLATE = [
  { description: 'Industry-sponsored capstone projects', descriptionAr: 'مشروعات تخرج مشتركة مع الصناعة', icon: 'briefcase', displayOrder: 1 },
  { description: 'Skill bootcamps and entrepreneurship sprints', descriptionAr: 'معسكرات مهارات وريادة أعمال', icon: 'zap', displayOrder: 2 },
  { description: 'Field visits and structured summer internships', descriptionAr: 'زيارات ميدانية وتدريب صيفي', icon: 'map', displayOrder: 3 },
];

export async function seedUniversitiesExtras(dataSource: DataSource) {
  const timelineRepo = dataSource.getRepository(AdmissionTimeline);
  const momentsRepo = dataSource.getRepository(CampusMoment);

  const timelineCount = await timelineRepo.count();
  if (timelineCount > 0) {
    console.log('ℹ️  Admission timelines already exist. Skipping...');
    return;
  }

  const uniRepo = dataSource.getRepository('universities');
  const universities = await uniRepo.find();

  for (const uni of universities) {
    for (const step of TIMELINE_TEMPLATE) {
      await timelineRepo.save(timelineRepo.create({ ...step, universityId: uni.id }));
    }
    for (const moment of MOMENTS_TEMPLATE) {
      await momentsRepo.save(momentsRepo.create({ ...moment, universityId: uni.id }));
    }
  }

  console.log(`✅ Admission timelines & campus moments seeded for ${universities.length} universities`);
}
