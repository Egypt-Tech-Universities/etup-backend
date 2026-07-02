import { DataSource } from 'typeorm';
import { Program } from '../../modules/programs/domain/entities/program.entity';
import { Faculty } from '../../modules/universities/domain/entities/faculty.entity';
import { ProgramCategory } from '../../modules/programs/domain/enums/program-category.enum';
import { DegreeLevel } from '../../modules/programs/domain/enums/degree-level.enum';
import { ProgramLanguage } from '../../modules/programs/domain/enums/program-language.enum';

interface ProgramSeedData {
  name: string;
  nameAr: string;
  slug: string;
  icon: string;
  description: string;
  descriptionAr: string;
  category: ProgramCategory;
  degreeLevel: DegreeLevel;
  language: ProgramLanguage;
  durationYears: number;
  totalCredits?: number;
  careerPaths: string;
  avgSalaryMin: number;
  avgSalaryMax: number;
  isFeatured: boolean;
  facultyName: string;
  highlights: { title: string; titleAr: string; icon: string; description?: string }[];
  outcomes: { outcome: string; outcomeAr: string }[];
}

export const PROGRAMS_SEED: ProgramSeedData[] = [
  // ============== IT ==============
  {
    name: 'Information Technology',
    nameAr: 'تكنولوجيا المعلومات',
    slug: 'information-technology',
    icon: '💻',
    description: 'A comprehensive program covering networks, cybersecurity, software development, and modern IT infrastructure. Students gain hands-on experience with industry-standard tools and prepare for high-demand IT careers.',
    descriptionAr: 'برنامج شامل يغطي الشبكات والأمن السيبراني وتطوير البرمجيات والبنية التحتية الحديثة لتكنولوجيا المعلومات.',
    category: ProgramCategory.IT,
    degreeLevel: DegreeLevel.BACHELOR,
    language: ProgramLanguage.MIXED,
    durationYears: 4,
    totalCredits: 144,
    careerPaths: 'Software Developer, Network Engineer, Cybersecurity Analyst, Database Administrator, Cloud Engineer',
    avgSalaryMin: 8000,
    avgSalaryMax: 25000,
    isFeatured: true,
    facultyName: 'Faculty of Industrial and Energy Technology',
    highlights: [
      { title: 'Hands-on Lab Training', titleAr: 'تدريب عملي بالمعامل', icon: '🔬' },
      { title: 'Industry Partnerships', titleAr: 'شراكات مع الصناعة', icon: '🤝' },
      { title: 'Cisco & Microsoft Certifications', titleAr: 'شهادات سيسكو ومايكروسوفت', icon: '🏆' },
      { title: 'Internship Opportunities', titleAr: 'فرص تدريبية', icon: '💼' },
    ],
    outcomes: [
      { outcome: 'Design and implement secure networks', outcomeAr: 'تصميم وتنفيذ شبكات آمنة' },
      { outcome: 'Develop modern web and mobile applications', outcomeAr: 'تطوير تطبيقات ويب وموبايل حديثة' },
      { outcome: 'Manage databases and cloud infrastructure', outcomeAr: 'إدارة قواعد البيانات والبنية السحابية' },
      { outcome: 'Conduct cybersecurity assessments', outcomeAr: 'إجراء تقييمات الأمن السيبراني' },
    ],
  },

  // ============== Mechatronics ==============
  {
    name: 'Mechatronics Technology',
    nameAr: 'تكنولوجيا الميكاترونيكس',
    slug: 'mechatronics-technology',
    icon: '🤖',
    description: 'Multidisciplinary program combining mechanical, electrical, and computer engineering for automation, robotics, and smart manufacturing systems.',
    descriptionAr: 'برنامج متعدد التخصصات يجمع بين الهندسة الميكانيكية والكهربائية والحاسوب للأتمتة والروبوتات والتصنيع الذكي.',
    category: ProgramCategory.ENGINEERING,
    degreeLevel: DegreeLevel.BACHELOR,
    language: ProgramLanguage.MIXED,
    durationYears: 4,
    totalCredits: 148,
    careerPaths: 'Automation Engineer, Robotics Engineer, PLC Programmer, Manufacturing Engineer',
    avgSalaryMin: 7000,
    avgSalaryMax: 22000,
    isFeatured: true,
    facultyName: 'Faculty of Industrial and Energy Technology',
    highlights: [
      { title: 'Modern Robotics Lab', titleAr: 'معمل روبوتات حديث', icon: '🤖' },
      { title: 'PLC & SCADA Training', titleAr: 'تدريب PLC و SCADA', icon: '⚙️' },
      { title: 'CAD/CAM Software', titleAr: 'برامج CAD/CAM', icon: '📐' },
      { title: 'Industry 4.0 Focus', titleAr: 'التركيز على الصناعة 4.0', icon: '🏭' },
    ],
    outcomes: [
      { outcome: 'Design and program automated systems', outcomeAr: 'تصميم وبرمجة أنظمة آلية' },
      { outcome: 'Develop robotic solutions for industry', outcomeAr: 'تطوير حلول روبوتية للصناعة' },
      { outcome: 'Integrate mechanical and electronic systems', outcomeAr: 'دمج الأنظمة الميكانيكية والإلكترونية' },
    ],
  },

  // ============== Autotronics ==============
  {
    name: 'Autotronics Technology',
    nameAr: 'تكنولوجيا الإلكترونيات المتحركة',
    slug: 'autotronics-technology',
    icon: '🚗',
    description: 'Specialized program focusing on modern automotive systems including electric vehicles, hybrid technology, diagnostics, and embedded automotive electronics.',
    descriptionAr: 'برنامج متخصص يركز على أنظمة السيارات الحديثة بما في ذلك المركبات الكهربائية والهجينة والتشخيص.',
    category: ProgramCategory.ENGINEERING,
    degreeLevel: DegreeLevel.BACHELOR,
    language: ProgramLanguage.ARABIC,
    durationYears: 4,
    totalCredits: 144,
    careerPaths: 'Automotive Engineer, EV Technician, Vehicle Diagnostics Specialist, Embedded Systems Engineer',
    avgSalaryMin: 7500,
    avgSalaryMax: 20000,
    isFeatured: true,
    facultyName: 'Faculty of Industrial and Energy Technology',
    highlights: [
      { title: 'Electric Vehicle Lab', titleAr: 'معمل السيارات الكهربائية', icon: '🔋' },
      { title: 'OBD-II Diagnostics', titleAr: 'تشخيص OBD-II', icon: '🔧' },
      { title: 'Partnership with Car Manufacturers', titleAr: 'شراكة مع شركات تصنيع السيارات', icon: '🚙' },
    ],
    outcomes: [
      { outcome: 'Diagnose and repair modern vehicles', outcomeAr: 'تشخيص وإصلاح المركبات الحديثة' },
      { outcome: 'Work with EV powertrains and batteries', outcomeAr: 'العمل على أنظمة نقل الحركة الكهربائية' },
    ],
  },

  // ============== Renewable Energy ==============
  {
    name: 'Renewable Energy Technology',
    nameAr: 'تكنولوجيا الطاقة المتجددة',
    slug: 'renewable-energy-technology',
    icon: '☀️',
    description: 'Future-focused program on sustainable energy: solar, wind, energy storage, and smart grid technology. Graduates lead the green energy transition.',
    descriptionAr: 'برنامج موجه نحو المستقبل في الطاقة المستدامة: الطاقة الشمسية وطاقة الرياح وتخزين الطاقة وتكنولوجيا الشبكات الذكية.',
    category: ProgramCategory.ENERGY,
    degreeLevel: DegreeLevel.BACHELOR,
    language: ProgramLanguage.MIXED,
    durationYears: 4,
    totalCredits: 144,
    careerPaths: 'Solar System Designer, Wind Energy Specialist, Energy Auditor, Smart Grid Engineer',
    avgSalaryMin: 9000,
    avgSalaryMax: 24000,
    isFeatured: true,
    facultyName: 'Faculty of Industrial and Energy Technology',
    highlights: [
      { title: 'Solar PV Installation Lab', titleAr: 'معمل تركيب الطاقة الشمسية', icon: '☀️' },
      { title: 'Wind Energy Simulator', titleAr: 'محاكاة طاقة الرياح', icon: '💨' },
      { title: 'Industry Internships', titleAr: 'تدريب صناعي', icon: '🏭' },
    ],
    outcomes: [
      { outcome: 'Design solar PV and wind systems', outcomeAr: 'تصميم أنظمة الطاقة الشمسية والرياح' },
      { outcome: 'Conduct energy audits', outcomeAr: 'إجراء تدقيق طاقة' },
      { outcome: 'Manage smart grid technologies', outcomeAr: 'إدارة تقنيات الشبكة الذكية' },
    ],
  },

  // ============== Petroleum ==============
  {
    name: 'Petroleum Technology',
    nameAr: 'تكنولوجيا البترول',
    slug: 'petroleum-technology',
    icon: '🛢️',
    description: 'Comprehensive program covering oil & gas exploration, drilling, reservoir engineering, and petroleum refining.',
    descriptionAr: 'برنامج شامل يغطي استكشاف النفط والغاز والحفر وهندسة الخزانات وتكرير البترول.',
    category: ProgramCategory.ENERGY,
    degreeLevel: DegreeLevel.BACHELOR,
    language: ProgramLanguage.ENGLISH,
    durationYears: 4,
    totalCredits: 152,
    careerPaths: 'Petroleum Engineer, Drilling Engineer, Reservoir Engineer, Refinery Operator',
    avgSalaryMin: 12000,
    avgSalaryMax: 35000,
    isFeatured: false,
    facultyName: 'Faculty of Industrial and Energy Technology',
    highlights: [
      { title: 'Drilling Simulator', titleAr: 'محاكي الحفر', icon: '🛢️' },
      { title: 'Reservoir Modeling Lab', titleAr: 'معمل نمذجة الخزانات', icon: '⚙️' },
      { title: 'Partnerships with Oil Companies', titleAr: 'شراكات مع شركات البترول', icon: '🤝' },
    ],
    outcomes: [
      { outcome: 'Plan and execute drilling operations', outcomeAr: 'تخطيط وتنفيذ عمليات الحفر' },
      { outcome: 'Analyze reservoir performance', outcomeAr: 'تحليل أداء الخزانات' },
    ],
  },

  // ============== Prosthetics ==============
  {
    name: 'Prosthetics & Orthotics Technology',
    nameAr: 'تكنولوجيا الأطراف الصناعية والتقويم',
    slug: 'prosthetics-orthotics-technology',
    icon: '🦿',
    description: 'Design and develop artificial limbs and orthopedic devices using modern CAD/CAM, 3D printing, and biomechanics.',
    descriptionAr: 'تصميم وتطوير الأطراف الصناعية والأجهزة التقويمية باستخدام CAD/CAM والطباعة ثلاثية الأبعاد.',
    category: ProgramCategory.HEALTH_SCIENCES,
    degreeLevel: DegreeLevel.BACHELOR,
    language: ProgramLanguage.MIXED,
    durationYears: 4,
    totalCredits: 148,
    careerPaths: 'Prosthetist, Orthotist, Rehabilitation Engineer, Medical Device Developer',
    avgSalaryMin: 8000,
    avgSalaryMax: 22000,
    isFeatured: true,
    facultyName: 'Faculty of Applied Health Sciences Technology',
    highlights: [
      { title: '3D Printing Lab', titleAr: 'معمل الطباعة ثلاثية الأبعاد', icon: '🖨️' },
      { title: 'Biomechanics Lab', titleAr: 'معمل الميكانيكا الحيوية', icon: '🦾' },
      { title: 'Clinical Internships', titleAr: 'تدريب إكلينيكي', icon: '🏥' },
    ],
    outcomes: [
      { outcome: 'Design custom prosthetic limbs', outcomeAr: 'تصميم أطراف صناعية مخصصة' },
      { outcome: 'Create orthopedic support devices', outcomeAr: 'صنع أجهزة دعم تقويمية' },
    ],
  },

  // ============== Textile ==============
  {
    name: 'Textile Engineering Technology',
    nameAr: 'هندسة تكنولوجيا النسيج',
    slug: 'textile-engineering-technology',
    icon: '🧵',
    description: 'Modern textile manufacturing covering spinning, weaving, dyeing, and quality control for the global apparel industry.',
    descriptionAr: 'تصنيع نسيج حديث يشمل الغزل والنسيج والصباغة ومراقبة الجودة لصناعة الملابس العالمية.',
    category: ProgramCategory.ENGINEERING,
    degreeLevel: DegreeLevel.BACHELOR,
    language: ProgramLanguage.ARABIC,
    durationYears: 4,
    totalCredits: 144,
    careerPaths: 'Textile Engineer, Quality Controller, Production Manager, Dyeing Supervisor',
    avgSalaryMin: 6000,
    avgSalaryMax: 18000,
    isFeatured: false,
    facultyName: 'Faculty of Textile Technologies',
    highlights: [
      { title: 'Modern Textile Looms', titleAr: 'أنوال نسيج حديثة', icon: '🧵' },
      { title: 'Dyeing & Finishing Lab', titleAr: 'معمل الصباغة والتشطيب', icon: '🎨' },
    ],
    outcomes: [
      { outcome: 'Operate modern textile machinery', outcomeAr: 'تشغيل آلات النسيج الحديثة' },
      { outcome: 'Control textile production quality', outcomeAr: 'مراقبة جودة الإنتاج النسجي' },
    ],
  },

  // ============== Maritime Logistics ==============
  {
    name: 'Maritime & Port Logistics',
    nameAr: 'لوجستيات الموانئ والبحرية',
    slug: 'maritime-port-logistics',
    icon: '⚓',
    description: 'Specialized program in port operations, shipping, and international logistics serving Egypt\'s strategic maritime industries.',
    descriptionAr: 'برنامج متخصص في عمليات الموانئ والشحن واللوجستيات الدولية يخدم صناعات مصر البحرية الاستراتيجية.',
    category: ProgramCategory.BUSINESS,
    degreeLevel: DegreeLevel.BACHELOR,
    language: ProgramLanguage.MIXED,
    durationYears: 4,
    totalCredits: 140,
    careerPaths: 'Port Manager, Logistics Coordinator, Shipping Agent, Customs Broker',
    avgSalaryMin: 8000,
    avgSalaryMax: 22000,
    isFeatured: false,
    facultyName: 'Faculty of Maritime Logistics & Trade Technology',
    highlights: [
      { title: 'Port Simulation Lab', titleAr: 'معمل محاكاة الموانئ', icon: '🚢' },
      { title: 'Suez Canal Authority Partnership', titleAr: 'شراكة مع هيئة قناة السويس', icon: '🤝' },
    ],
    outcomes: [
      { outcome: 'Manage port operations efficiently', outcomeAr: 'إدارة عمليات الموانئ بكفاءة' },
      { outcome: 'Handle international shipping documentation', outcomeAr: 'التعامل مع وثائق الشحن الدولي' },
    ],
  },

  // ============== Construction ==============
  {
    name: 'Construction Technology',
    nameAr: 'تكنولوجيا البناء والتشييد',
    slug: 'construction-technology',
    icon: '🏗️',
    description: 'Modern construction engineering covering project management, building materials, concrete technology, and structural design.',
    descriptionAr: 'هندسة البناء الحديثة تشمل إدارة المشاريع ومواد البناء وتكنولوجيا الخرسانة والتصميم الإنشائي.',
    category: ProgramCategory.ENGINEERING,
    degreeLevel: DegreeLevel.BACHELOR,
    language: ProgramLanguage.ARABIC,
    durationYears: 4,
    totalCredits: 144,
    careerPaths: 'Site Engineer, Project Manager, Quantity Surveyor, Construction Inspector',
    avgSalaryMin: 7000,
    avgSalaryMax: 20000,
    isFeatured: false,
    facultyName: 'Faculty of Construction & Building Materials',
    highlights: [
      { title: 'Concrete Testing Lab', titleAr: 'معمل اختبار الخرسانة', icon: '🏗️' },
      { title: 'BIM & AutoCAD Training', titleAr: 'تدريب BIM و AutoCAD', icon: '📐' },
    ],
    outcomes: [
      { outcome: 'Manage construction projects', outcomeAr: 'إدارة مشاريع البناء' },
      { outcome: 'Test and select building materials', outcomeAr: 'اختبار واختيار مواد البناء' },
    ],
  },

  // ============== Hospitality & Tourism ==============
  {
    name: 'Hospitality & Tourism Management',
    nameAr: 'إدارة الضيافة والسياحة',
    slug: 'hospitality-tourism-management',
    icon: '🏨',
    description: 'Comprehensive program preparing students for careers in Egypt\'s thriving hospitality and tourism industry.',
    descriptionAr: 'برنامج شامل يعد الطلاب للعمل في صناعة الضيافة والسياحة المزدهرة في مصر.',
    category: ProgramCategory.TOURISM,
    degreeLevel: DegreeLevel.BACHELOR,
    language: ProgramLanguage.ENGLISH,
    durationYears: 4,
    totalCredits: 140,
    careerPaths: 'Hotel Manager, Tour Operator, F&B Manager, Event Coordinator',
    avgSalaryMin: 6000,
    avgSalaryMax: 25000,
    isFeatured: false,
    facultyName: 'Faculty of Hospitality & Tourism Technology',
    highlights: [
      { title: 'Training Hotel On-Campus', titleAr: 'فندق تدريبي بالحرم', icon: '🏨' },
      { title: 'Foreign Languages Required', titleAr: 'لغات أجنبية مطلوبة', icon: '🌍' },
    ],
    outcomes: [
      { outcome: 'Manage hotel operations', outcomeAr: 'إدارة عمليات الفنادق' },
      { outcome: 'Develop tourism packages', outcomeAr: 'تطوير برامج سياحية' },
    ],
  },

  // ============== Heritage Restoration ==============
  {
    name: 'Heritage Restoration Technology',
    nameAr: 'تكنولوجيا ترميم التراث',
    slug: 'heritage-restoration-technology',
    icon: '🏛️',
    description: 'Unique program preserving Egypt\'s ancient heritage using modern restoration science and digital documentation.',
    descriptionAr: 'برنامج فريد للحفاظ على التراث المصري القديم باستخدام علم الترميم الحديث والتوثيق الرقمي.',
    category: ProgramCategory.ARTS,
    degreeLevel: DegreeLevel.BACHELOR,
    language: ProgramLanguage.MIXED,
    durationYears: 4,
    totalCredits: 140,
    careerPaths: 'Monument Restorer, Museum Conservator, Heritage Consultant, Site Manager',
    avgSalaryMin: 5500,
    avgSalaryMax: 18000,
    isFeatured: true,
    facultyName: 'Faculty of Heritage Restoration & Antiquities Technology',
    highlights: [
      { title: 'Hands-on at Luxor Sites', titleAr: 'تدريب عملي بمواقع الأقصر', icon: '🏛️' },
      { title: '3D Scanning Lab', titleAr: 'معمل المسح ثلاثي الأبعاد', icon: '📸' },
      { title: 'Antiquities Ministry Partnership', titleAr: 'شراكة مع وزارة الآثار', icon: '🤝' },
    ],
    outcomes: [
      { outcome: 'Restore ancient monuments scientifically', outcomeAr: 'ترميم الآثار القديمة علمياً' },
      { outcome: 'Document heritage digitally', outcomeAr: 'توثيق التراث رقمياً' },
    ],
  },

  // ============== Aquaculture ==============
  {
    name: 'Aquaculture & Fisheries Technology',
    nameAr: 'تكنولوجيا الاستزراع السمكي ومصائد الأسماك',
    slug: 'aquaculture-fisheries-technology',
    icon: '🐟',
    description: 'Modern fish farming and seafood processing program serving Egypt\'s growing aquaculture industry.',
    descriptionAr: 'برنامج حديث في الاستزراع السمكي ومعالجة المأكولات البحرية يخدم صناعة الاستزراع السمكي المتنامية في مصر.',
    category: ProgramCategory.AGRICULTURE,
    degreeLevel: DegreeLevel.BACHELOR,
    language: ProgramLanguage.ARABIC,
    durationYears: 4,
    totalCredits: 144,
    careerPaths: 'Fish Farm Manager, Aquaculture Engineer, Fisheries Inspector, Feed Specialist',
    avgSalaryMin: 6000,
    avgSalaryMax: 18000,
    isFeatured: false,
    facultyName: 'Faculty of Aquaculture & Fisheries Processing',
    highlights: [
      { title: 'Modern RAS Systems', titleAr: 'أنظمة استزراع حديثة RAS', icon: '♻️' },
      { title: 'Research Hatchery', titleAr: 'مفرخ بحثي', icon: '🐠' },
    ],
    outcomes: [
      { outcome: 'Manage fish farming operations', outcomeAr: 'إدارة عمليات استزراع الأسماك' },
      { outcome: 'Implement biosecurity protocols', outcomeAr: 'تطبيق بروتوكولات الأمن الحيوي' },
    ],
  },

  // ============== Sugar Technology ==============
  {
    name: 'Sugar Cane Processing Technology',
    nameAr: 'تكنولوجيا معالجة قصب السكر',
    slug: 'sugar-cane-processing-technology',
    icon: '🍬',
    description: 'Specialized program for Upper Egypt\'s sugar industry covering refining, by-product utilization, and modern processing.',
    descriptionAr: 'برنامج متخصص لصناعة السكر في صعيد مصر يغطي التكرير واستخدام المنتجات الثانوية والمعالجة الحديثة.',
    category: ProgramCategory.AGRICULTURE,
    degreeLevel: DegreeLevel.BACHELOR,
    language: ProgramLanguage.ARABIC,
    durationYears: 4,
    totalCredits: 140,
    careerPaths: 'Sugar Factory Supervisor, Process Engineer, Quality Controller',
    avgSalaryMin: 6500,
    avgSalaryMax: 16000,
    isFeatured: false,
    facultyName: 'Faculty of Sugar & Agro-Industry Technology',
    highlights: [
      { title: 'Pilot Sugar Plant', titleAr: 'مصنع سكر تجريبي', icon: '🏭' },
      { title: 'Sugar Factories Partnership', titleAr: 'شراكة مع مصانع السكر', icon: '🤝' },
    ],
    outcomes: [
      { outcome: 'Operate sugar processing plants', outcomeAr: 'تشغيل مصانع معالجة السكر' },
      { outcome: 'Optimize sugar extraction yield', outcomeAr: 'تحسين كفاءة استخلاص السكر' },
    ],
  },

  // ============== Ceramics ==============
  {
    name: 'Ceramics Technology',
    nameAr: 'تكنولوجيا السيراميك',
    slug: 'ceramics-technology',
    icon: '🏺',
    description: 'Modern ceramics manufacturing program covering tableware, sanitary ware, and industrial ceramics production.',
    descriptionAr: 'برنامج تصنيع سيراميك حديث يغطي إنتاج أواني المائدة والأدوات الصحية والسيراميك الصناعي.',
    category: ProgramCategory.ENGINEERING,
    degreeLevel: DegreeLevel.BACHELOR,
    language: ProgramLanguage.ARABIC,
    durationYears: 4,
    totalCredits: 140,
    careerPaths: 'Ceramics Engineer, Production Supervisor, Quality Controller, Kiln Operator',
    avgSalaryMin: 6000,
    avgSalaryMax: 17000,
    isFeatured: false,
    facultyName: 'Faculty of Ceramics & Construction Materials',
    highlights: [
      { title: 'Modern Kilns Lab', titleAr: 'معمل أفران حديثة', icon: '🔥' },
      { title: 'Glazing & Decoration Studio', titleAr: 'استوديو التزجيج والديكور', icon: '🎨' },
    ],
    outcomes: [
      { outcome: 'Design and produce ceramic products', outcomeAr: 'تصميم وإنتاج منتجات سيراميكية' },
      { outcome: 'Operate kilns and glazing equipment', outcomeAr: 'تشغيل الأفران ومعدات التزجيج' },
    ],
  },

  // ============== Higher Diploma in IT (2 years) ==============
  {
    name: 'Higher Diploma in IT',
    nameAr: 'دبلوم عالي في تكنولوجيا المعلومات',
    slug: 'higher-diploma-it',
    icon: '📱',
    description: 'Fast-track 2-year program for technical diploma holders to gain advanced IT skills and enter the workforce quickly.',
    descriptionAr: 'برنامج سريع لمدة سنتين لحاملي الدبلومات الفنية لاكتساب مهارات تقنية متقدمة ودخول سوق العمل بسرعة.',
    category: ProgramCategory.IT,
    degreeLevel: DegreeLevel.HIGHER_DIPLOMA,
    language: ProgramLanguage.MIXED,
    durationYears: 2,
    totalCredits: 72,
    careerPaths: 'IT Technician, Junior Developer, Network Administrator',
    avgSalaryMin: 5000,
    avgSalaryMax: 12000,
    isFeatured: false,
    facultyName: 'Faculty of Industrial and Energy Technology',
    highlights: [
      { title: 'Fast-track to Career', titleAr: 'مسار سريع للعمل', icon: '⚡' },
      { title: 'Industry Certifications', titleAr: 'شهادات صناعية', icon: '🏆' },
    ],
    outcomes: [
      { outcome: 'Work as IT support technician', outcomeAr: 'العمل كفني دعم تقني' },
      { outcome: 'Develop basic web applications', outcomeAr: 'تطوير تطبيقات ويب أساسية' },
    ],
  },
];

export async function seedPrograms(dataSource: DataSource): Promise<void> {
  const programRepo = dataSource.getRepository(Program);
  const facultyRepo = dataSource.getRepository(Faculty);

  console.log('🗑️  Clearing existing programs...');
  await dataSource.query('TRUNCATE TABLE "program_highlights" CASCADE');
  await dataSource.query('TRUNCATE TABLE "program_outcomes" CASCADE');
  await dataSource.query('TRUNCATE TABLE "programs" CASCADE');

  console.log(`\n🌱 Seeding ${PROGRAMS_SEED.length} programs...\n`);

  // Build a map of faculty names → Faculty entities
  const allFaculties = await facultyRepo.find();
  const facultyMap = new Map<string, Faculty>();
  allFaculties.forEach((f) => facultyMap.set(f.name, f));

  for (let i = 0; i < PROGRAMS_SEED.length; i++) {
    const data = PROGRAMS_SEED[i];
    const { facultyName, ...rest } = data;

    const faculty = facultyMap.get(facultyName);
    if (!faculty) {
      console.warn(`   ⚠️  Faculty "${facultyName}" not found, skipping`);
      continue;
    }

    const program = programRepo.create({
      ...rest,
      facultyId: faculty.id,
    } as any);

    const saved = await programRepo.save(program);
    const result: any = Array.isArray(saved) ? saved[0] : saved;

    console.log(`${i + 1}/${PROGRAMS_SEED.length} ✅ ${data.name}`);
    console.log(`   Faculty: ${facultyName}`);
    console.log(`   ID: ${result.id}\n`);
  }

  console.log('============================================');
  console.log(`🎉 Programs seeded successfully!`);
  console.log(`   Total: ${PROGRAMS_SEED.length} programs`);
  console.log('============================================');
}
