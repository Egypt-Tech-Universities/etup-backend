import {
  UniversityType,
  ContactType,
  SocialPlatform,
  AdmissionType,
  DayOfWeek,
} from '../../shared/enums';

export const UNIVERSITIES_SEED = [

// ================================================================
// 1️⃣ NEW CAIRO TECHNOLOGICAL UNIVERSITY (NCTU)
// ================================================================
{
    name: 'New Cairo Technological University',
    nameAr: 'جامعة القاهرة الجديدة التكنولوجية',
    abbreviation: 'NCTU',
    description: 'New Cairo Technological University is a pioneering institution at the forefront of applied sciences and modern technology. Established to bridge the gap between academia and industry, NCTU equips students with cutting-edge skills and hands-on experience in various high-tech fields. The study period is four years (2+2), allowing students to obtain a higher-intermediate professional diploma after the first two years or continue for another two years to earn a professional bachelor\'s degree.',
    descriptionAr: 'جامعة القاهرة الجديدة التكنولوجية مؤسسة رائدة في مجال العلوم التطبيقية والتكنولوجيا الحديثة. أنشأت لسد الفجوة بين أكاديميا والصناعة، وتزود الطلاب بمهارات متقدمة وخبرة عملية. فترة الدراسة 4 سنوات (2+2).',
    region: 'Greater Cairo',
    governorate: 'Cairo',
    city: 'New Cairo',
    address: 'New Cairo Technological University, New Cairo, Egypt',
    latitude: 30.0444,
    longitude: 31.2357,
    established: 2022,
    type: UniversityType.TECHNOLOGICAL,
    website: 'https://nctu.edu.eg',
    logoUrl: 'https://drive.google.com/uc?export=view&id=1V0zI4o5GiyO6wKw5IlvgDPAs4vjuQPVi',
    coverImageUrl: 'https://drive.google.com/uc?export=view&id=IMAGE_COVER_NCTU',
    vision: 'To contribute effectively to economic and social development by providing high-quality technological education that meets labor market demands, achieves excellence, creativity, and global leadership.',
    visionAr: 'المساهمة الفعالة في التنمية الاقتصادية والاجتماعية من خلال توفير تعليم تكنولوجي عالي الجودة يلبي مطالب سوق العمل ويحقق التميز والإبداع والقيادة العالمية.',
    mission: 'To provide high-quality technological education through strong academic and practical programs at undergraduate and postgraduate levels. NCTU aims to prepare graduates with knowledge, creativity, teamwork, and technological skills who can compete locally and internationally.',
    missionAr: 'تقديم تعليم تكنولوجي عالي الجودة من خلال برامج أكاديمية وعملية قوية على مستوى البكالورياس والدراسات العليا. تهدف الجامعة لإعداد الخريجين بالمرفة والإبداع والعمل الجماعي والمهارات التكنولوجية.',
    coreValues: 'Excellence in applied education, Innovation and integrity, Industry-aligned learning, Collaboration and social responsibility, Fostering creativity and technological advancement to support sustainable development.',
    coreValuesAr: 'التميز في التعليم التطبيقي، الابتكار والنزاهة، التعلم الموائم للصناعة، العمل الجماعي والمسؤولية الاجتماعية، تعزيز الإبداع والتقدم التكنولوجي لدعم التنمية المستدامة.',
    tuitionMin: 15000,
    tuitionMax: 20000,
    applicationLink: 'https://nctu.edu.eg/admission',
    totalStudents: 3200,
    totalFaculty: 180,
    totalPrograms: 24,
    
    faculties: [
      // Faculty 1: Industrial & Energy
      {
        name: 'Faculty of Industrial and Energy Technology',
        nameAr: 'كلية التكنولوجيا الصناعية والطاقة',
        overview: 'The Faculty provides multidisciplinary education covering IT, Mechatronics, Autotronics, Renewables, and Petroleum - all aligned with Fourth Industrial Revolution needs.',
        dean: 'Prof. Dr. Waleed El-Khatem',
        
        departments: [
          // Dept 1: IT
          {
            name: 'Information Technology',
            nameAr: 'تكنولوجيا المعلومات',
            overview: 'Equips students with essential skills in computing and information systems, focusing on practical training and real-world applications.',
            coordinator: 'Dr. Osama Tharwat',
            
            specializations: [
              { name: 'Networks & Cybersecurity', nameAr: 'الشبكات والأمن السيبراني', icon: '🔒', description: 'Designing secure networks and defending against cyber threats' },
              { name: 'Software Development', nameAr: 'تطوير البرمجيات', icon: '💻', description: 'Full-stack development including modern frameworks and DevOps practices' }
            ],
            
            careers: [
              { title: 'Software Developer', titleAr: 'مطور برمجيات', icon: '💻' },
              { title: 'Cybersecurity Analyst', titleAr: 'محلل أمن سيبراني', icon: '🔒' },
              { title: 'Network Engineer', titleAr: 'مهندس شبكات', icon: '🌐' },
              { title: 'Database Administrator', titleAr: 'مسؤول قواعد بيانات', icon: '🗄️' },
              { title: 'AI & Machine Learning Engineer', titleAr: 'مهندس ذكاء اصطناعي', icon: '🤖' }
            ]
          },
          
          // Dept 2: Mechatronics
          {
            name: 'Mechatronics Technology',
            nameAr: 'تكنولوجيا الميكاترونيكس',
            overview: 'Provides students with a multidisciplinary education in mechanical, electrical, and computer engineering, preparing them for careers in automation, robotics, and smart manufacturing.',
            coordinator: 'Dr. Karim Gad',
            
            specializations: [
              { name: 'Automation & Robotics', nameAr: 'الأتمتة والروبوتات', icon: '🤖', description: 'Building automated systems and intelligent robots for modern factories' },
              { name: 'Mechanical & Electrical Systems', nameAr: 'الأنظمة الميكانيكية والكهربائية', icon: '⚙️', description: 'Integrating mechanical design with electrical control systems' }
            ],
            
            careers: [
              { title: 'Automation Engineer', titleAr: 'مهندس أتمتة', icon: '⚙️' },
              { title: 'Robotics Engineer', titleAr: 'مهندس روبوتات', icon: '🤖' },
              { title: 'Mechatronics Systems Designer', titleAr: 'مصمم أنظمة ميكاترونيكس', icon: '🔧' }
            ]
          },
          
          // Dept 3: Autotronics
          {
            name: 'Autotronics Technology',
            nameAr: 'تكنولوجيا الإلكترونيات المتحركة',
            overview: 'Focuses on the integration of electronics, automation, and mechanics in modern automotive systems. The program prepares students for careers in smart vehicle technology, electric and hybrid cars, and advanced automotive diagnostics.',
            coordinator: 'Dr. Sherif El-Hosary',
            
            specializations: [
              { name: 'Electric & Hybrid Vehicles', nameAr: 'المركبات الكهربائية والهجينة', icon: '🚗', description: 'EV powertrains, battery management systems, and charging infrastructure' },
              { name: 'Automotive Electronics & Diagnostics', nameAr: 'إلكترونيات السيارات والتشخيص', icon: '🔧', description: 'Modern ECU diagnostics, sensor systems, and onboard computer programming' },
              { name: 'Automotive Mechatronics', nameAr: 'الميكاترونيكس السياري', icon: '⚙️', description: 'Combined mechanical-electrical expertise for automotive engineering' }
            ],
            
            careers: [
              { title: 'Automotive Engineer', titleAr: 'مهندس سيارات', icon: '🚗' },
              { title: 'Vehicle Diagnostics Specialist', titleAr: 'أخصائي تشخيص مركبات', icon: '🔧' },
              { title: 'Electric & Hybrid Vehicle Technician', titleAr: 'فني مركبات كهربائية وهجينة', icon: '🔋' },
              { title: 'Manufacturing & Production Engineer', titleAr: 'مهندس تصنيع وإنتاج', icon: '🏭' },
              { title: 'Embedded Systems Engineer', titleAr: 'مهندس أنظمة مضمنة', icon: '💡' }
            ]
          },
          
          // Dept 4: Renewable Energy
          {
            name: 'Renewable Energy Technology',
            nameAr: 'تكنولوجيا الطاقة المتجددة',
            overview: 'Focuses on sustainable energy solutions, including solar, wind, and energy storage systems. The program prepares students for careers in the green energy sector, power management, and smart grid technology.',
            coordinator: 'Dr. Ahmed Hassan',
            
            specializations: [
              { name: 'Solar Energy Systems', nameAr: 'أنظمة الطاقة الشمسية', icon: '☀️', description: 'PV system design, solar panel installation, and solar farm project management' },
              { name: 'Wind Energy', nameAr: 'طاقة الرياح', icon: '💨', description: 'Wind turbine technology, farm planning, and grid integration' },
              { name: 'Energy Storage & Smart Grid', nameAr: 'تخزين الطاقة والشبكة الذكية', icon: '🔋', description: 'Battery technologies, smart grid infrastructure, and demand response systems' }
            ],
            
            careers: [
              { title: 'Renewable Energy Specialist', titleAr: 'أخصائي طاقة متجددة', icon: '⚡' },
              { title: 'Solar Power System Designer', titleAr: 'مصمم أنظمة طاقة شمسية', icon: '☀️' },
              { title: 'Wind Energy Specialist', titleAr: 'أخصائي طاقة رياح', icon: '💨' },
              { title: 'Energy Storage & Battery Engineer', titleAr: 'مهندس تخزين طاقة وبطاريات', icon: '🔋' },
              { title: 'Smart Grid & Sustainability Consultant', titleAr: 'استشاري شبكة ذكية واستدامة', icon: '🌍' }
            ]
          },
          
          // Dept 5: Petroleum
          {
            name: 'Petroleum Technology',
            nameAr: 'تكنولوجيا البترول',
            overview: 'Focuses on the exploration, extraction, and refining of oil and gas. The program equips students with skills needed in drilling, reservoir engineering, and petroleum processing, preparing them for careers in the energy sector.',
            coordinator: 'Dr. Mohamed Fouad',
            
            specializations: [
              { name: 'Drilling & Exploration', nameAr: 'الحفر والاستكشاف', icon: '🛢️', description: 'Well planning, drilling operations, and geological surveying techniques' },
              { name: 'Reservoir Engineering', nameAr: 'هندسة خزانات النفط', icon: '⚙️', description: 'Reservoir simulation, enhanced oil recovery, and production optimization' },
              { name: 'Petroleum Refining & Processing', nameAr: 'تكرير ومعالجة البترول', icon: '🏭', description: 'Refinery operations, petrochemical processes, and quality control' }
            ],
            
            careers: [
              { title: 'Petroleum Engineer', titleAr: 'مهندس بترول', icon: '⛽' },
              { title: 'Drilling & Production Engineer', titleAr: 'مهندس حفر وإنتاج', icon: '🛢️' },
              { title: 'Reservoir Engineer', titleAr: 'مهندس خزانات', icon: '⚙️' },
              { title: 'Refinery & Process Engineer', titleAr: 'مهندس تكرير وعمليات', icon: '🏭' },
              { title: 'Energy & Environmental Consultant', titleAr: 'استشاري طاقة وبيئة', icon: '🌍' }
            ]
          }
        ]
      },
      
      // Faculty 2: Applied Health Sciences
      {
        name: 'Faculty of Applied Health Sciences Technology',
        nameAr: 'كلية العلوم الصحية التطبيقية التكنولوجية',
        overview: 'Focuses on the design, development, and application of artificial limbs and supportive devices. The program equips students with skills needed to improve mobility and enhance quality of life for individuals with disabilities.',
        dean: 'Prof. Dr. Mohamed Fawzy El-Souda',
        
        departments: [
          {
            name: 'Prosthetics & Orthotics Technology',
            nameAr: 'تكنولوجيا الأطراف الصناعية والتقويم',
            overview: 'Focuses on the design, development, and application of artificial limbs and supportive devices to improve mobility and quality of life.',
            coordinator: 'Dr. Samir Abdelhamid',
            
            specializations: [
              { name: 'Prosthetic Technology', nameAr: 'تكنولوجيا الأطراف الصناعية', icon: '🦿', description: 'Designing and fitting artificial limbs using modern CAD/CAM and 3D printing' },
              { name: 'Orthotic Technology', nameAr: 'تكنولوجيا التقويم', icon: '🦾', description: 'Creating supportive braces and orthopedic devices for rehabilitation' },
              { name: 'Biomechanics & Rehabilitation', nameAr: 'بيوميكانيكا وإعادة التأهيل', icon: '⚙️', description: 'Understanding human movement mechanics and designing effective rehabilitation protocols' }
            ],
            
            careers: [
              { title: 'Prosthetist & Orthotist', titleAr: 'أخصائي أطراف صناعية وتقويم', icon: '🦾' },
              { title: 'Medical Device Specialist', titleAr: 'أخصائي أجهزة طبية', icon: '🔬' },
              { title: 'Rehabilitation Engineer', titleAr: 'مهندس تأهيل', icon: '🏥' },
              { title: 'R&D in Medical Technology', titleAr: 'بحث وتطوير في التقنية الطبية', icon: '🔬' },
              { title: 'Healthcare & Assistive Technology Consultant', titleAr: 'استشاري رعاية صحية وتقنية مساعدة', icon: '🌍' }
            ]
          }
        ]
      }
    ],
    
    contacts: [
      { type: ContactType.PHONE, value: '+201111335725', label: 'Mobile Phone' },
      { type: ContactType.PHONE, value: '0225390250', label: 'Landline' },
      { type: ContactType.EMAIL, value: 'info@nctu.edu.eg', label: 'Email' },
      { type: ContactType.ADDRESS, value: 'New Cairo Technological University, New Cairo, Egypt', label: 'Office Location' }
    ],
    
    socialLinks: [
      { platform: SocialPlatform.FACEBOOK, url: 'https://www.facebook.com/share/1FkChjbnkk/' },
      { platform: SocialPlatform.LINKEDIN, url: 'https://www.linkedin.com/in/nctu/' },
      { platform: SocialPlatform.TWITTER, url: 'https://x.com/nctu_edu_eg_1' },
      { platform: SocialPlatform.TIKTOK, url: 'https://www.tiktok.com/@newcairotechnological' },
      { platform: SocialPlatform.YOUTUBE, url: 'https://www.youtube.com/@nctu.edu.eg.1' }
    ],
    
    leadership: [
      { name: 'Prof. Dr. Tarek Abdel Malek', nameAr: 'أ.د. طارق عبد الملك', position: 'President of New Cairo Technological University', positionAr: 'رئيس جامعة القاهرة الجديدة التكنولوجية', displayOrder: 1 },
      { name: 'Prof. Dr. Mohamed Fawzy El-Souda', nameAr: 'أ.د. محمد فوزي السودا', position: 'Dean of the Faculty of Applied Health Sciences', positionAr: 'عميد كلية العلوم الصحية التطبيقية', displayOrder: 2 },
      { name: 'Prof. Dr. Waleed El-Khatem', nameAr: 'أ.د. وليد الخاتم', position: 'Dean of the Faculty of Industrial Technology and Energy', positionAr: 'عميد كلية التكنولوجيا الصناعية والطاقة', displayOrder: 3 },
      { name: 'Prof. Dr. Tamer Abu El-Naga', nameAr: 'أ.د. تامر أبو النجا', position: 'Vice Dean for Student Affairs - Industrial Tech', positionAr: 'وكيل كلية التكنولوجيا الصناعية لشؤون الطلاب', displayOrder: 4 },
      { name: 'Dr. Karim Gad', nameAr: 'د. كريم جاد', position: 'Coordinator of Mechatronics Program', positionAr: 'منسق برنامج الميكاترونيكس', displayOrder: 5 },
      { name: 'Dr. Sherif El-Hosary', nameAr: 'د. شريف الحوسري', position: 'Coordinator of Mechatronics Technology Program', positionAr: 'منسق برنامج تكنولوجيا الميكاترونيكس', displayOrder: 6 },
      { name: 'Dr. Osama Tharwat', nameAr: 'د. أسامة ثروت', position: 'Coordinator of Telecommunications and Information Technology Program', positionAr: 'منسق برنامج الاتصالات وتكنولوجيا المعلومات', displayOrder: 7 }
    ],
    
    workingHours: [
      { day: DayOfWeek.MONDAY, openTime: '09:00', closeTime: '15:30', isClosed: false },
      { day: DayOfWeek.TUESDAY, openTime: '09:00', closeTime: '15:30', isClosed: false },
      { day: DayOfWeek.WEDNESDAY, openTime: '09:00', closeTime: '15:30', isClosed: false },
      { day: DayOfWeek.THURSDAY, openTime: '09:00', closeTime: '15:30', isClosed: false },
      { day: DayOfWeek.FRIDAY, openTime: null, closeTime: null, isClosed: true },
      { day: DayOfWeek.SATURDAY, openTime: null, closeTime: null, isClosed: true },
      { day: DayOfWeek.SUNDAY, openTime: '09:00', closeTime: '15:30', isClosed: false }
    ],
    
    images: [
      { imageUrl: 'https://drive.google.com/uc?export=view&id=IMG001', caption: 'NCTU Main Building Front View', displayOrder: 1 },
      { imageUrl: 'https://drive.google.com/uc?export=view&id=IMG002', caption: 'NCTU Campus Entrance with Egyptian Flag', displayOrder: 2 },
      { imageUrl: 'https://drive.google.com/uc?export&view&id=IMG003', caption: 'NCTU Official Logo High Resolution', displayOrder: 3 }
    ],
    
    admissionRequirements: [
      {
        type: AdmissionType.GENERAL_SECONDARY,
        description: 'Applicants must hold a recognized General Secondary Education Certificate or its equivalent. The total grade must meet the minimum score determined annually by the university or by the national coordination office. Applicants must submit all required documents including the original certificate, birth certificate, personal photos, national ID, and medical report if requested.',
        descriptionAr: 'يجب أن يحمل المتقدم شهادة الثانوية العامة المعترف بها أو ما يعادلها. يجب أن يكون المجموع الكلي قد حقق الحد الأدنى من الدرجات الذي تحدده الجامعة أو مكتب التنسيق الوطني سنويًا.'
      },
      {
        type: AdmissionType.TECHNICAL_DIPLOMA,
        description: 'Applicants must hold an officially recognized Technical Diploma (3 or 5 years) or an equivalent qualification. Admission depends on achieving the minimum percentage or score set by the university or national coordination each year.',
        descriptionAr: 'يجب أن يحمل المتقدم دبلوم فني معترف به رسميًا (3 أو 5 سنوات) أو مؤهل معادل.'
      }
    ],
    
    tuitionFees: [
      { yearRange: 'Year 1 & Year 2', amount: 15000, currency: 'EGP', academicYear: '2025-2026', notes: 'Annual tuition fees for first two academic years' },
      { yearRange: 'Year 3 & Year 4', amount: 20000, currency: 'EGP', academicYear: '2025-2026', notes: 'Annual tuition fees for final two years leading to Bachelor\'s degree' }
    ],
    
    scholarships: [
      { 
        name: 'Merit Scholarships', 
        nameAr: 'منح التفوق الأكاديمي', 
        description: 'For students with outstanding academic performance during previous study periods. Some scholarships require maintaining a high GPA.', 
        descriptionAr: 'للطلاب الذين يتميزون بالأداء الأكاديمي الممتاز خلال الفترات الدراسية السابقة. بعض المنح تتطلب الحفاظ على معدل تراكمي مرتفع.' 
      },
      { 
        name: 'Scholarships for Students with Disabilities', 
        nameAr: 'منح للطلاب ذوي الاحتياجات الخاصة', 
        description: 'Dedicated support for students with special needs to ensure equal access to technological education.', 
        descriptionAr: 'دعم خاص للطلاب ذوي الاحتياجات الخاصة لضمان تكافؤ الفرص في التعليم التكنولوجي.' 
      }
    ]
  },

// ================================================================
// 2️⃣ DELTA TECHNOLOGICAL UNIVERSITY (DTU) - دمياط
// ================================================================
{
    name: 'Delta Technological University',
    nameAr: 'جامعة الدلتا التكنولوجية',
    abbreviation: 'DTU',
    description: 'Serving the Delta region with focus on textile technology, industrial management, food processing, and agricultural machinery supporting the rich agricultural-industrial base of the Nile Delta.',
    descriptionAr: 'تخدم منطقة الدلتا مع تركيز على تقنيات النسيج والإدارة الصناعية ومعالجة الأغذية والآلات الزراعية.',
    region: 'Nile Delta',
    governorate: 'Damietta',
    city: 'New Damietta City',
    established: 2022,
    type: UniversityType.TECHNOLOGICAL,
    website: 'https://dtu.edu.eg',
    logoUrl: 'https://dtu.edu.eg/logo.png',
    tuitionMin: 14000,
    tuitionMax: 19000,
    totalStudents: 1800,
    totalFaculty: 95,
    totalPrograms: 12,
    
    faculties: [
      {
        name: 'Faculty of Textile Technologies',
        nameAr: 'كلية تقنيات النسيج والملابس',
        dean: 'Prof. Dr. Mahmoud Kamel',
        departments: [
          {
            name: 'Textile Engineering Technology',
            nameAr: 'هندسة تكنولوجيا النسيج',
            coordinator: 'Dr. Salma Ezzat',
            specializations: [
              { name: 'Spinning & Weaving Technology', nameAr: 'تكنولوجيا الغزل والنسيج', icon: '🧵' },
              { name: 'Textile Chemistry & Dyeing', nameAr: 'كيمياء النسيج والصباغة', icon: '🎨' }
            ],
            careers: [
              { title: 'Textile Production Manager', titleAr: 'مدير إنتاج نسيجي', icon: '🏭' },
              { title: 'Quality Control Inspector', titleAr: 'مفتش جودة منسوجي', icon: '✅' },
              { title: 'Dyeing House Supervisor', titleAr: 'مشرف صباغة أقمشة', icon: '🎨' }
            ]
          },
          {
            name: 'Garment Manufacturing Technology',
            nameAr: 'تكنولوجيا تصنيع الملابس',
            coordinator: 'Dr. Hani Ragab',
            specializations: [
              { name: 'Pattern Making & Cutting', nameAr: 'صنع القصات والقطع', icon: '✂️' },
              { name: 'Apparel Production Management', nameAr: 'إنتاج الملابس الجاهزة', icon: '👕' }
            ],
            careers: [
              { title: 'Factory Production Manager', titleAr: 'مدير مصنع ملابس', icon: '🏭' },
              { title: 'Fashion Production Coordinator', titleAr: 'منسق إنتاج أزياء', icon: '👗' }
            ]
          }
        ]
      },
      {
        name: 'Faculty of Business & Industrial Management',
        nameAr: 'كلية إدارة الأعمال والتصنيع',
        dean: 'Prof. Dr. Rania Hussein',
        departments: [
          {
            name: 'Industrial Management Technology',
            nameAr: 'تكنولوجيا الإدارة الصناعية',
            coordinator: 'Dr. Hossam Adel',
            specializations: [
              { name: 'Production Planning & Control', nameAr: 'تخطيط والتحكم في الإنتاج', icon: '📊' },
              { name: 'Quality Assurance & ISO Standards', nameAr: 'ضمان الجودة ومعايير الآيزو', icon: '✅' }
            ],
            careers: [
              { title: 'Production Manager', titleAr: 'مدير إنتاج', icon: '👷' },
              { title: 'Quality Assurance Officer', titleAr: 'ضابط ضمان جودة', icon: '✅' }
            ]
          }
        ]
      }
    ],
    contacts: [
      { type: ContactType.PHONE, value: '+20123456789', label: 'Main Office Damietta' },
      { type: ContactType.EMAIL, value: 'info@dtu.edu.eg', label: 'Info Email' }
    ],
    socialLinks: [
      { platform: SocialPlatform.FACEBOOK, url: 'https://facebook.com/dtu.eduegypt' },
      { platform: SocialPlatform.LINKEDIN, url: 'https://linkedin.com/company/delta-tech-univ' }
    ],
    leadership: [
      { name: 'Prof. Dr. Ali Hashem', nameAr: 'أ.د. علي هاشم', position: 'President', positionAr: 'رئيس الجامعة', displayOrder: 1 },
      { name: 'Prof. Dr. Samira Abdelaziz', nameAr: 'أ.د. سميرة عبد العزيز', position: 'Vice President', positionAr: 'نائب الرئيس', displayOrder: 2 }
    ],
    workingHours: [
      { day: DayOfWeek.SUNDAY, openTime: '08:30', closeTime: '16:00' },
      { day: DayOfWeek.MONDAY, openTime: '08:30', closeTime: '16:00' },
      { day: DayOfWeek.TUESDAY, openTime: '08:30', closeTime: '16:00' },
      { day: DayOfWeek.WEDNESDAY, openTime: '08:30', closeTime: '16:00' },
      { day: DayOfWeek.THURSDAY, openTime: '08:30', closeTime: '16:00' },
      { day: DayOfWeek.FRIDAY, isClosed: true },
      { day: DayOfWeek.SATURDAY, openTime: '10:00', closeTime: '14:00' }
    ],
    admissionRequirements: [
      { type: AdmissionType.GENERAL_SECONDARY, description: 'General Secondary Science/Math track with minimum specified grades for textile programs.' },
      { type: AdmissionType.TECHNICAL_DIPLOMA, description: 'Textile, garment, or business-related technical diplomas preferred.' }
    ],
    tuitionFees: [ { yearRange: 'Years 1-2', amount: 14000 }, { yearRange: 'Years 3-4', amount: 19000 } ],
    scholarships: []
  },

// ================================================================
// 3️⃣ BORG EL ARAB TECHNOLOGICAL UNIVERSITY (BATU) - برج العرب
// ================================================================
{
    name: 'Borg El Arab Technological University',
    nameAr: 'جامعة برج العرب التكنولوجية',
    abbreviation: 'BATU',
    description: 'Strategically located near Alexandria serving maritime, port logistics, and heavy manufacturing industries of the Western region.',
    descriptionAr: 'تقع استراتيجيًا بالقرب من الإسكندرية لتخدم الصناعات البحرية ولوجستيات الموانئ والصناعات الثقيلة بالمنطقة الغربية.',
    region: 'Alexandria Region',
    governorate: 'Alexandria',
    city: 'Borg El Arab New City',
    established: 2022,
    type: UniversityType.TECHNOLOGICAL,
    website: 'https://batu.edu.eg',
    logoUrl: 'https://batu.edu.eg/logo.png',
    tuitionMin: 16000,
    tuitionMax: 22000,
    totalStudents: 2100,
    totalFaculty: 110,
    totalPrograms: 14,
    
    faculties: [
      {
        name: 'Faculty of Maritime Logistics & Trade Technology',
        nameAr: 'كلية تكنولوجيا اللوجستيات البحرية والتجارة',
        dean: 'Prof. Dr. Omar Farouk',
        departments: [
          {
            name: 'Port Operations Technology',
            nameAr: 'تكنولوجيا عمليات الموانئ',
            coordinator: 'Dr. Tarek Badr',
            specializations: [
              { name: 'Container Handling & Terminal Operations', nameAr: 'معالجة الحاويات وعمليات المحطات', icon: '🚢' },
              { name: 'International Shipping Documentation', nameAr: 'وثائق الشحن الدولي', icon: '📋' }
            ],
            careers: [
              { title: 'Port Operations Manager', titleAr: 'مدير عمليات ميناء', icon: '⚓' },
              { title: 'Shipping Agent', titleAr: 'وكيل شحن بحري', icon: '🚢' }
            ]
          },
          {
            name: 'International Trade & Customs Technology',
            nameAr: 'تكنولوجيا التجارة الدولية والجمارك',
            coordinator: 'Dr. Ahmed Said',
            specializations: [
              { name: 'Customs Clearance Procedures', nameAr: 'إجراءات التخليص الجمركي', icon: '🛃' },
              { name: 'Export/Import Documentation', nameAr: 'وثائق التصدير والاستيراد', icon: '📑' }
            ],
            careers: [
              { title: 'Customs Broker', titleAr: 'وسيط جمركي', icon: '🛃' },
              { title: 'Trade Compliance Specialist', titleAr: 'أخصائي امتثال تجاري', icon: '⚖️' }
            ]
          }
        ]
      },
      {
        name: 'Faculty of Heavy Industries Technology',
        nameAr: 'كلية تقنيات الصناعات الثقيلة',
        dean: 'Prof. Dr. Nadia Salah',
        departments: [
          {
            name: 'CNC & Automated Manufacturing',
            nameAr: 'تكنولوجيا CNC والأتمتة الصناعية',
            coordinator: 'Dr. Khaled Mansour',
            specializations: [
              { name: 'CNC Programming & Operation', nameAr: 'برمجة وتشغيل CNC', icon: '🔩' },
              { name: 'Industrial Automation Systems', nameAr: 'أنظمة الأتمتة الصناعية', icon: '🤖' }
            ],
            careers: [
              { title: 'CNC Programmer', titleAr: 'مبرمج CNC', icon: '💻' },
              { title: 'Maintenance Automation Engineer', titleAr: 'مهندس صيانة أتمتة', icon: '🔧' }
            ]
          },
          {
            name: ' Welding & Metal Fabrication Technology',
            nameAr: 'تكنولوجيا اللحام وتشكيل المعادن',
            coordinator: 'Dr. Mohamed Adel',
            specializations: [
              { name: 'Arc & MIG Welding Technology', nameAr: 'تكنولوجيا اللحام القوسي وMIG', icon: '🔨' },
              { name: 'Sheet Metal Forming', nameAr: 'تشكيل الصفائح المعدنية', icon: '🔩' }
            ]
          }
        ]
      }
    ],
    contacts: [
      { type: ContactType.PHONE, value: '+20345678901', label: 'Borg El Arab Office' },
      { type: ContactType.EMAIL, value: 'info@batu.edu.eg', label: 'Contact Email' }
    ],
    socialLinks: [{ platform: SocialPlatform.FACEBOOK, url: 'https://facebook.com/batu.university' }],
    leadership: [
      { name: 'Prof. Dr. Omar Farouk', nameAr: 'أ.د. عمر فاروق', position: 'President', displayOrder: 1 },
      { name: 'Prof. Dr. Nadia Salah', nameAr: 'أ.د. نادية صلاح', position: 'Vice President', displayOrder: 2 }
    ],
    workingHours: [
      { day: DayOfWeek.SUNDAY, openTime: '09:00', closeTime: '16:00' },
      { day: DayOfWeek.MONDAY, openTime: '09:00', closeTime: '16:00' },
      { day: DayOfWeek.TUESDAY, openTime: '09:00', closeTime: '16:00' },
      { day: DayOfWeek.WEDNESDAY, openTime: '09:00', closeTime: '16:00' },
      { day: DayOfWeek.THURSDAY, openTime: '09:00', closeTime: '16:00' },
      { day: DayOfWeek.FRIDAY, isClosed: true },
      { day: DayOfWeek.SATURDAY, openTime: '10:00', closeTime: '13:00' }
    ],
    admissionRequirements: [
      { type: AdmissionType.GENERAL_SECONDARY, description: 'Scientific Secondary required for engineering tracks.' },
      { type: AdmissionType.TECHNICAL_DIPLOMA, description: 'Technical diplomas in mechanics, welding, or maritime studies accepted.' }
    ],
    tuitionFees: [ { yearRange: 'Years 1-2', amount: 16000 }, { yearRange: 'Years 3-4', amount: 22000 } ],
    scholarships: []
  },

// ================================================================
// 4️⃣ EL-SALAM TECHNOLOGICAL UNIVERSITY (STU) - السويس / بورسعيد
// ================================================================
{
    name: 'El-Salam Technological University',
    nameAr: 'جامعة السلام التكنولوجية',
    abbreviation: 'STU',
    description: 'Specializing in trade technology, international commerce, and logistics leveraging its strategic location near the Suez Canal Economic Zone and New Administrative Capital corridor.',
    descriptionAr: 'متخصصة في تكنولوجيا التجارة الدولية والتجارة الداخلية واللوجستisks مستفيدة من موقعها الاستراتيجي بالقرب من المنطقة الاقتصادية لقناة السويس.',
    region: 'Canal Zone',
    governorate: 'Suez / Ismailia',
    city: 'El-Salam Technological City',
    established: 2022,
    type: UniversityType.TECHNOLOGICAL,
    website: 'https://stu.edu.eg',
    logoUrl: 'https://stu.edu.eg/logo.png',
    tuitionMin: 13000,
    tuitionMax: 18000,
    totalStudents: 1500,
    totalFaculty: 80,
    totalPrograms: 10,
    
    faculties: [
      {
        name: 'Faculty of International Trade & Logistics',
        nameAr: 'كلية التجارة الدولية واللوجستكس',
        dean: 'Prof. Dr. Layla Tawfik',
        departments: [
          {
            name: 'International Trade Technology',
            nameAr: 'تكنولوجيا التجارة الدولية',
            coordinator: 'Dr. Amr El-Banna',
            specializations: [
              { name: 'Foreign Exchange & International Payments', nameAr: 'صرف الأجنات والمدفوعات الدولية', icon: '💱' },
              { name: 'Logistics Chain Management', nameAr: 'إدارة سلسلة التوريد اللوجستي', icon: '📦' },
              { name: 'Digital Commerce & e-Business', nameAr: 'التجارة الإلكترونية والأعمال الرقمية', icon: '💻' }
            ],
            careers: [
              { title: 'Import/Export Coordinator', titleAr: 'منسق تصدير واستيراد', icon: '🌍' },
              { title: 'Customs Declaration Specialist', titleAr: 'أخصائي إعلان جمركي', icon: '📝' },
              { title: 'Supply Chain Analyst', titleAr: 'محلل سلسلة إمداد', icon: '📊' }
            ]
          },
          {
            name: 'Cold Chain & Refrigeration Technology',
            nameAr: 'تكنولوجيا سلسلة التبريد والتبريد',
            coordinator: 'Dr. Emad Mahfouz',
            specializations: [
              { name: 'Refrigeration System Maintenance', nameAr: 'صيانة أنظمة التثليج', icon: '❄️' },
              { name: 'Cold Storage Warehouse Management', nameAr: 'إدارة مخازن التبريد', icon: '🧊' }
            ],
            careers: [
              { title: 'Refrigeration Technician', titleAr: 'فني تثليج وتكييف', icon: '❄️' },
              { title: 'Cold Chain Logistics Manager', titleAr: 'مدير لوجستيات سلسلة التبريد', icon: '📦' }
            ]
          }
        ]
      }
    ],
    contacts: [
      { type: ContactType.PHONE, value: '+20663456789', label: 'Main Line' },
      { type: ContactType.EMAIL, value: 'info@stu.edu.eg' }
    ],
    socialLinks: [
      { platform: SocialPlatform.FACEBOOK, url: 'https://facebook.com/salam.tech.univ' },
      { platform: SocialPlatform.LINKEDIN, url: 'https://linkedin.com/company/stu-technology' }
    ],
    leadership: [
      { name: 'Prof. Dr. Layla Tawfik', nameAr: 'أ.د. ليلى توفيق', position: 'President', displayOrder: 1 },
      { name: 'Prof. Dr. Essam El-Din', nameAr: 'أ.د. عصام الدين', position: 'Vice President', displayOrder: 2 }
    ],
    workingHours: [
      { day: DayOfWeek.SUNDAY, openTime: '08:00', closeTime: '15:00' },
      { day: DayOfWeek.MONDAY, openTime: '08:00', closeTime: '15:00' },
      { day: DayOfWeek.TUESDAY, openTime: '08:00', closeTime: '15:00' },
      { day: DayOfWeek.WEDNESDAY, openTime: '08:00', closeTime: '15:00' },
      { day: DayOfWeek.THURSDAY, openTime: '08:00', closeTime: '15:00' },
      { day: DayOfWeek.FRIDAY, isClosed: true },
      { day: DayOfWeek.SATURDAY, openTime: '09:00', closeTime: '12:00' }
    ],
    admissionRequirements: [
      { type: AdmissionType.GENERAL_SECONDARY, description: 'General Secondary Certificate with good grades. Business track preferred but not mandatory.' },
      { type: AdmissionType.TECHNICAL_DIPLOMA, description: 'Commercial, accounting, or logistics diplomas prioritized.' }
    ],
    tuitionFees: [ { yearRange: 'Years 1-2', amount: 13000 }, { yearRange: 'Years 3-4', amount: 18000 } ],
    scholarships: []
  },

// ================================================================
// 5️⃣ ZAFRANA TECHNOLOGICAL UNIVERSITY (ZTU) - زفرانا / العين السخنة
// ================================================================
{
    name: 'Zafrana Technological University',
    nameAr: 'جامعة زفرانا التكنولوجية',
    abbreviation: 'ZTU',
    description: 'Leveraging its strategic location in Ain Sokhna area to focus on oil & gas refining, desalination plants, water treatment, and green hydrogen industries supporting the Suez Canal Economic Zone.',
    descriptionAr: 'تستفيد من موقعها الاستراتيجي في منطقة العين السخنة للتركيز على تكرير البترول ومحطات تحلية مياه البحر ومعالجة المياه وصناعات الهيدروجين الأخضر.',
    region: 'Red Sea/Gulf of Suez',
    governorate: 'South Sinai / Suez',
    city: 'Ain Sukhna / Zafrana Area',
    established: 2023,
    type: UniversityType.TECHNOLOGICAL,
    website: 'https://ztu.edu.eg',
    logoUrl: 'https://ztu.edu.eg/logo.png',
    tuitionMin: 15000,
    tuitionMax: 21000,
    totalStudents: 1600,
    totalFaculty: 85,
    totalPrograms: 11,
    
    faculties: [
      {
        name: 'Faculty of Petrochemical & Refining Technology',
        nameAr: 'كلية تكنولوجيا البتروكيماويات والتكرير',
        dean: 'Prof. Dr. Sameh Reda',
        departments: [
          {
            name: 'Petrochemical Processing Technology',
            nameAr: 'تكنولوجيا المعالجات البتروكيماوية',
            coordinator: 'Dr. Nasser Ahmed',
            specializations: [
              { name: 'Refinery Process Operations', nameAr: 'عمليات معامل التكرير', icon: '🏭' },
              { name: 'Polymer Production Technology', nameAr: 'تكنولوجيا إنتاج البوليمرات', icon: '🧪' },
              { name: 'Quality Testing of Oil Products', nameAr: 'اختبار جودة المنتجات البترولية', icon: '🔬' }
            ],
            careers: [
              { title: 'Process Operator', titleAr: 'مشغل عمليات تكرير', icon: '🛠️' },
              { title: 'Lab Chemist - Petrochemical', titleAr: 'كيميائي مختبر بتروكيماوي', icon: '🧪' },
              { title: 'Safety Engineer - Petroleum Plants', titleAr: 'مهندس سلامة مصانع بترولية', icon: '🦺' }
            ]
          }
        ]
      },
      {
        name: 'Faculty of Water Desalination & Treatment Technology',
        nameAr: 'كلية تكنولوجيا تحلية المياه ومعالجتها',
        dean: 'Prof. Dr. Heba Gamal',
        departments: [
          {
            name: 'Desalination Plant Technology',
            nameAr: 'تكنولوجيا محطات التحلية',
            coordinator: 'Dr. Mostafa Ebrahim',
            specializations: [
              { name: 'RO (Reverse Osmosis) System Operation', nameAr: 'تشغيل أنظمة التناضح العكسي', icon: '💧' },
              { name: 'Thermal Desalination Technologies', nameAr: 'تقنيات التحلية الحرارية', icon: '🌡️' }
            ],
            careers: [
              { title: 'Desalination Plant Operator', titleAr: 'مشغل محطة تحلية', icon: '🚰' },
              { title: 'Water Quality Analyst', titleAr: 'محلل جودة مياه', icon: '🔬' }
            ]
          },
          {
            name: 'Wastewater Treatment Technology',
            nameAr: 'تكنولوجيا معالجة مياه الصرف',
            coordinator: 'Dr. Youssef Rady',
            specializations: [
              { name: 'Biological Water Treatment', nameAr: 'المعالجة البيولوجية للمياه', icon: '🦠' },
              { name: 'Industrial Effluent Treatment', nameAr: 'معالجة المخلفات الصناعية', icon: '♻️' }
            ]
          }
        ]
      }
    ],
    contacts: [
      { type: ContactType.PHONE, value: '+206523456789', label: 'Main Office' },
      { type: ContactType.EMAIL, value: 'info@ztu.edu.eg' }
    ],
    socialLinks: [{ platform: SocialPlatform.FACEBOOK, url: 'https://facebook.com/zafrana.tech.u' }],
    leadership: [
      { name: 'Prof. Dr. Sameh Reda', nameAr: 'أ.د. سمه رضا', position: 'President', displayOrder: 1 },
      { name: 'Prof. Dr. Heba Gamal', nameAr: 'أ.د. هبة جمال', position: 'Vice President Academic Affairs', displayOrder: 2 }
    ],
    workingHours: [
      { day: DayOfWeek.SUNDAY, openTime: '07:00', closeTime: '15:00' },
      { day: DayOfWeek.MONDAY, openTime: '07:00', closeTime: '15:00' },
      { day: DayOfWeek.TUESDAY, openTime: '07:00', closeTime: '15:00' },
      { day: DayOfWeek.WEDNESDAY, openTime: '07:00', closeTime: '15:00' },
      { day: DayOfWeek.THURSDAY, openTime: '07:00', closeTime: '15:00' },
      { day: DayOfWeek.FRIDAY, isClosed: true },
      { day: DayOfWeek.SATURDAY, openTime: '08:00', closeTime: '12:00' }
    ],
    admissionRequirements: [
      { type: AdmissionType.GENERAL_SECONDARY, description: 'Science track (Chemistry, Physics) strongly preferred due to petrochemical focus.' },
      { type: AdmissionType.TECHNICAL_DIPLOMA, description: 'Chemical or mechanical diplomas highly valued.' }
    ],
    tuitionFees: [ { yearRange: 'Years 1-2', amount: 15000 }, { yearRange: 'Years 3-4', amount: 21000 } ],
    scholarships: []
  },

// ================================================================
// 6️⃣ ASSIUT TECHNOLOGICAL UNIVERSITY (ATU) - أسيوط
// ================================================================
{
    name: 'Assiut Technological University',
    nameAr: 'جامعة أسيوط التكنولوجية',
    abbreviation: 'ATU',
    description: 'Serving Upper Egypt\'s largest city with focus on construction technology, building materials, marble/stone processing, and renewable energy suitable for southern industrial development zones.',
    descriptionAr: 'تخدم أكبر مدن صعيد مصر مع تركيز على تقنيات البناء ومواد البناء ومعالجة الرخام والحجر والطاقة المتجددة المناسبة للمناطق الصناعية الجنوبية.',
    region: 'Upper Egypt',
    governorate: 'Assiut',
    city: 'Assiut New City',
    established: 2022,
    type: UniversityType.TECHNOLOGICAL,
    website: 'https://atu.edu.eg',
    logoUrl: 'https://atu.edu.eg/logo.png',
    tuitionMin: 12000,
    tuitionMax: 17000,
    totalStudents: 2200,
    totalFaculty: 120,
    totalPrograms: 16,
    
    faculties: [
      {
        name: 'Faculty of Construction & Building Materials',
        nameAr: 'كلية البناء ومواد البناء',
        dean: 'Prof. Dr. Medhat Ali',
        departments: [
          {
            name: 'Construction Technology',
            nameAr: 'تكنولوجيا البناء والتشييد',
            coordinator: 'Dr. Ibrahim Fahmy',
            specializations: [
              { name: 'Concrete Technology & Quality Control', nameAr: 'تكنولوجيا الخرسانة ومراقبة الجودة', icon: '🏗️' },
              { name: 'Construction Project Management', nameAr: 'إدارة مشاريع البناء', icon: '📐' },
              { name: 'Surveying & Site Layout', nameAr: 'المساحة وتخطيط المواقع', icon: '📏' }
            ],
            careers: [
              { title: 'Site Engineer', titleAr: 'مهندس موقع', icon: '🏗️' },
              { title: 'Quantity Surveyor', titleAr: 'مساح كمي', icon: '📐' },
              { title: 'Construction Estimator', titleAr: 'مقدر تكلفة إنشاء', icon: '💰' }
            ]
          },
          {
            name: 'Marble & Stone Processing Technology',
            nameAr: 'تكنولوجيا معالجة الرخام والحجر',
            coordinator: 'Dr. Khaled Soliman',
            specializations: [
              { name: 'Stone Quarrying & Extraction', nameAr: 'استخراج وقطع الحجر', icon: '⛏️' },
              { name: ' Marble Finishing & Polishing', nameAr: 'تشطيب وتلميع الرخام', icon: '🪨' }
            ],
            careers: [
              { title: 'Processing Plant Operator', titleAr: 'مشغل معالجة أحجار', icon: '🏭' },
              { title: 'Stone Cutting Machine Operator', titleAr: 'مشغل ماكينات قطع حجر', icon: '⚙️' }
            ]
          }
        ]
      },
      {
        name: 'Faculty of Agricultural & Food Technology',
        nameAr: 'كلية تكنولوجيا الغذاء والزراعة',
        dean: 'Prof. Dr. Fatma Helal',
        departments: [
          {
            name: 'Food Processing Technology',
            nameAr: 'تكنولوجيا تصنيع الأغذية',
            coordinator: 'Dr. Magdy Wahba',
            specializations: [
              { name: 'Dairy Product Technology', nameAr: 'تكنولوجيا منتجات الألبان', icon: '🥛' },
              { name: 'Sugar Cane Processing', nameAr: 'تصنيع قصب السكر', icon: '🌾' },
              { name: 'Food Safety & Preservation', nameAr: 'سلامة الأغذية والحفاظ عليها', icon: '🍽️' }
            ],
            careers: [
              { title: 'Food Quality Controller', titleAr: 'مراقب جودة غذاء', icon: '✅' },
              { title: 'Production Supervisor - Food Factory', titleAr: 'مشرف إنتاج مصنع غذائي', icon: '🏭' }
            ]
          },
          {
            name: 'Solar Energy Installation & Maintenance',
            nameAr: 'تركيب وصيانة الطاقة الشمسية',
            coordinator: 'Dr. Rami Anwar',
            specializations: [
              { name: 'Off-Grid Solar Systems', nameAr: 'أنظمة طاقة شمسية خارج الشبكة', icon: '☀️' },
              { name: 'PV System Installation for Agriculture', nameAr: 'تركيب أنظمة PV للري الزراعي', icon: '🌻' }
            ]
          }
        ]
      }
    ],
    contacts: [
      { type: ContactType.PHONE, value: '+20881234567', label: 'Assiut Office' },
      { type: ContactType.EMAIL, value: 'info@atu.edu.eg' }
    ],
    socialLinks: [{ platform: SocialPlatform.FACEBOOK, url: 'https://facebook.com/assiut.tech.univ' }],
    leadership: [
      { name: 'Prof. Dr. Medhat Ali', nameAr: 'أ.د. مدحت علي', position: 'President', displayOrder: 1 },
      { name: 'Prof. Dr. Fatma Helal', nameAr: 'أ.د. فاطمة هلال', position: 'Dean - Food Tech Faculty', displayOrder: 2 }
    ],
    workingHours: [
      { day: DayOfWeek.SUNDAY, openTime: '08:00', closeTime: '14:30' },
      { day: DayOfWeek.MONDAY, openTime: '08:00', closeTime: '14:30' },
      { day: DayOfWeek.TUESDAY, openTime: '08:00', closeTime: '14:30' },
      { day: DayOfWeek.WEDNESDAY, openTime: '08:00', closeTime: '14:30' },
      { day: DayOfWeek.THURSDAY, openTime: '08:00', closeTime: '14:30' },
      { day: DayOfWeek.FRIDAY, isClosed: true },
      { day: DayOfWeek.SATURDAY, openTime: '09:00', closeTime: '12:00' }
    ],
    admissionRequirements: [
      { type: AdmissionType.GENERAL_SECONDARY, description: 'Mathematics track for construction; Biology/Chemistry for food tech.' },
      { type: AdmissionType.TECHNICAL_DIPLOMA, description: 'Building trades, marble work, or food processing diplomas.' }
    ],
    tuitionFees: [ { yearRange: 'Years 1-2', amount: 12000 }, { yearRange: 'Years 3-4', amount: 17000 } ],
    scholarships: []
  },

// ================================================================
// 7️⃣ SOHAG TECHNOLOGICAL UNIVERSITY (ShTU) - سوهاج
// ================================================================
{
    name: 'Sohag Technological University',
    nameAr: 'جامعة سوهاج التكنولوجية',
    abbreviation: 'ShTU',
    description: 'Leveraging Sohag\'s famous marble quarries and emerging tourism potential, specializing in stone/marble processing technology alongside hospitality and hotel management programs.',
    descriptionAr: 'تستفيد من محاجر الرخام المشهورة في سوهاج وإمكانيات السياحة الناشئة، تتخصص في تكنولوجيا معالجة الرخام والحجر بالإضافة إلى برامج الفنادق وإدارة الضيافة.',
    region: 'Upper Egypt',
    governorate: 'Sohag',
    city: 'Sohag New City',
    established: 2023,
    type: UniversityType.TECHNOLOGICAL,
    website: 'https://shtu.edu.eg',
    logoUrl: 'https://shtu.edu.eg/logo.png',
    tuitionMin: 11500,
    tuitionMax: 16500,
    totalStudents: 1200,
    totalFaculty: 65,
    totalPrograms: 9,
    
    faculties: [
      {
        name: 'Faculty of Stone & Marble Technology',
        nameAr: 'كلية تكنولوجيا الحجر والرخام',
        dean: 'Prof. Dr. Ahmed Gad',
        departments: [
          {
            name: 'Marble Processing & Design',
            nameAr: 'معالجة الرخام والتصميم',
            coordinator: 'Dr. Khaled Soliman',
            specializations: [
              { name: 'Artistic Marble Design Applications', nameAr: 'تصميمات تطبيقية رخام فنية', icon: '🎨' },
              { name: 'Granite & Limestone Processing', nameAr: 'معالجة الجرانيت والحجر الجيري', icon: '🪨' },
              { name: 'Mosaic & Tile Manufacturing', nameAr: 'تصنيع الفسيفيت والبلاط', icon: '🧱' }
            ],
            careers: [
              { title: 'Marble Factory Manager', titleAr: 'مدير مصنع رخام', icon: '🏭' },
              { title: 'Stone Cutting CNC Operator', titleAr: 'مشغل ماكينات قطع حجر CNC', icon: '💻' }
            ]
          },
          {
            name: 'Natural Stone Restoration',
            nameAr: 'ترميم الحجر الطبيعي',
            coordinator: 'Dr. Mohsen Fathi',
            specializations: [
              { name: 'Ancient Monument Restoration Techniques', nameAr: 'تقنيات ترميم الآثار الحجرية', icon: '🏺' },
              { name: 'Historic Buildings Conservation', nameAr: 'حفظ المباني الأثرية', icon: '🛡️' }
            ]
          }
        ]
      },
      {
        name: 'Faculty of Hospitality & Tourism Technology',
        nameAr: 'كلية تكنولوجيا الضيافة والسياحة',
        dean: 'Prof. Dr. Amira Saeed',
        departments: [
          {
            name: 'Hotel Management & Tourism Services',
            nameAr: 'إدارة الفنادق وخدمات السياحة',
            coordinator: 'Dr. Mona Hamdy',
            specializations: [
              { name: 'Front Office & Guest Relations', nameAr: 'الاستقبال والعلاقات بالضيوف', icon: '🏨' },
              { name: 'Housekeeping Operations', nameAr: 'عمليات التنظيف الفندقي', icon: '🧹' },
              { name: 'Food & Beverage Service Management', nameAr: 'إدارة خدمات المطاعم والمشروبات', icon: '🍽️' }
            ],
            careers: [
              { title: 'Front Office Manager', titleAr: 'مدير استقبال فندقي', icon: '🏨' },
              { title: 'Tour Guide Supervisor', titleAr: 'مشرف مرشدين سياحيين', icon: '🗺️' }
            ]
          },
          {
            name: 'Eco-Tourism Guiding Technology',
            nameAr: 'تكنولوجيا الإرشاد السياحي البيئي',
            coordinator: 'Dr. Safaa Ibrahim',
            specializations: [
              { name: 'Heritage Sites Interpretation', nameAr: 'تأويل المواقع التراثية', icon: '🏛️' },
              { name: 'Adventure Tourism Operations', nameAr: 'عمليات السياحة المغامراتية', icon: '🏞️' }
            ]
          }
        ]
      }
    ],
    contacts: [
      { type: ContactType.PHONE, value: '+20933456789', label: 'Sohag Main' },
      { type: ContactType.EMAIL, value: 'info@shtu.edu.eg' }
    ],
    socialLinks: [{ platform: SocialPlatform.FACEBOOK, url: 'https://facebook.com/sohag.tech.univ' }],
    leadership: [
      { name: 'Prof. Dr. Ahmed Gad', nameAr: 'أ.د. أحمد جاد', position: 'President', displayOrder: 1 },
      { name: 'Prof. Dr. Amira Saeed', nameAr: 'أ.د. أميرة سعيد', position: 'VP - Student Affairs', displayOrder: 2 }
    ],
    workingHours: [
      { day: DayOfWeek.SUNDAY, openTime: '08:00', closeTime: '14:00' },
      { day: DayOfWeek.MONDAY, openTime: '08:00', closeTime: '14:00' },
      { day: DayOfWeek.TUESDAY, openTime: '08:00', closeTime: '14:00' },
      { day: DayOfWeek.WEDNESDAY, openTime: '08:00', closeTime: '14:00' },
      { day: DayOfWeek.THURSDAY, openTime: '08:00', closeTime: '14:00' },
      { day: DayOfWeek.FRIDAY, isClosed: true },
      { day: DayOfWeek.SATURDAY, openTime: '09:00', closeTime: '12:00' }
    ],
    admissionRequirements: [
      { type: AdmissionType.GENERAL_SECONDARY, description: 'All secondary branches accepted. Artistic aptitude bonus for marble track.' },
      { type: AdmissionType.TECHNICAL_DIPLOMA, description: 'Stone cutting, tourism, or hospitality diplomas welcomed.' }
    ],
    tuitionFees: [ { yearRange: 'Years 1-2', amount: 11500 }, { yearRange: 'Years 3-4', amount: 16500 } ],
    scholarships: []
  },

// ================================================================
// 8️⃣ QENA TECHNOLOGICAL UNIVERSITY (QTU) - قنا
// ================================================================
{
    name: 'Qena Technological University',
    nameAr: 'جامعة قنا التكنولوجية',
    abbreviation: 'QTU',
    description: 'Serving Upper Egypt south with specialization in sugar cane production/refining technology, electricity distribution automation, and desert reclamation agriculture supporting the regional economy.',
    descriptionAr: 'تخدم جنوب صعيد مصر بتخصص في تكنولوجيا إنتاج قصب السكر/التكرير وأتمتة توزيع الكهرباء واستصلاح الأراضي الصحراوية لدعم الاقتصاد الإقليمي.',
    region: 'Upper Egypt South',
    governorate: 'Qena',
    city: 'Qena New City',
    established: 2023,
    type: UniversityType.TECHNOLOGICAL,
    website: 'https://qtu.edu.eg',
    logoUrl: 'https://qtu.edu.eg/logo.png',
    tuitionMin: 11000,
    tuitionMax: 16000,
    totalStudents: 1400,
    totalFaculty: 75,
    totalPrograms: 10,
    
    faculties: [
      {
        name: 'Faculty of Sugar & Agro-Industry Technology',
        nameAr: 'كلية تكنولوجيا السكر والصناعات الزراعية',
        dean: 'Prof. Dr. Saad El-Masry',
        departments: [
          {
            name: 'Sugar Cane Processing Technology',
            nameAr: 'تكنولوجيا معالجة قصب السكر',
            coordinator: 'Dr. Hamdi Saleh',
            specializations: [
              { name: 'Sugar Refining & Crystallization', nameAr: 'تكرير السكر والتبلور', icon: '🍬' },
              { name: 'By-Products Utilization (Bagasse/Molasses)', nameAr: 'استخدام المنتجات الثانوية (البجاس والدبس)', icon: '🌾' },
              { name: 'Agricultural Machinery Maintenance', nameAr: 'صيانة الآلات الزراعية', icon: '🚜' }
            ],
            careers: [
              { title: 'Sugar Factory Supervisor', titleAr: 'مشرف مصنع سكر', icon: '🏭' },
              { title: 'Agricultural Mechanization Specialist', titleAr: 'أخصائي مكنة زراعية', icon: '🚜' }
            ]
          }
        ]
      },
      {
        name: 'Faculty of Electrical Power Distribution & Control',
        nameAr: 'كلية القدرة الكهربائية والتوزيع والتحكم',
        dean: 'Prof. Dr. Gouda El-Nahhas',
        departments: [
          {
            name: 'Electrical Distribution Networks',
            nameAr: 'شبكات التوزيع الكهربائية',
            coordinator: 'Dr. Ashraf Abdelhamid',
            specializations: [
              { name: 'Medium Voltage Distribution Systems', nameAr: 'أنظمة توزيع متوسط الجهد', icon: '⚡' },
              { name: 'Substation Automation & SCADA', nameAr: 'أتمتة المحطات والسكادا', icon: '🖥️' },
              { name: 'Smart Metering Infrastructure', nameAr: 'بنية تحتية لعدادات ذكية', icon: '📟' }
            ],
            careers: [
              { title: 'Distribution Network Operator', titleAr: 'مشغل شبكة توزيع', icon: '⚡' },
              { title: 'Substation Maintenance Engineer', titleAr: 'مهندس صيانة محولات', icon: '🔌' }
            ]
          }
        ]
      }
    ],
    contacts: [
      { type: ContactType.PHONE, value: '+20962345678', label: 'Qena Office' },
      { type: ContactType.EMAIL, value: 'info@qtu.edu.eg' }
    ],
    socialLinks: [{ platform: SocialPlatform.FACEBOOK, url: 'https://facebook.com/qena.tech.univ' }],
    leadership: [
      { name: 'Prof. Dr. Saad El-Masry', nameAr: 'أ.د. سعد المصري', position: 'President', displayOrder: 1 },
      { name: 'Prof. Dr. Gouda El-Nahhas', nameAr: 'أ.د. جوده النحاس', position: 'Dean - Electrical Faculty', displayOrder: 2 }
    ],
    workingHours: [
      { day: DayOfWeek.SUNDAY, openTime: '08:00', closeTime: '14:00' },
      { day: DayOfWeek.MONDAY, openTime: '08:00', closeTime: '14:00' },
      { day: DayOfWeek.TUESDAY, openTime: '08:00', closeTime: '14:00' },
      { day: DayOfWeek.WEDNESDAY, openTime: '08:00', closeTime: '14:00' },
      { day: DayOfWeek.THURSDAY, openTime: '08:00', closeTime: '14:00' },
      { day: DayOfWeek.FRIDAY, isClosed: true },
      { day: DayOfWeek.SATURDAY, openTime: '09:00', closeTime: '12:00' }
    ],
    admissionRequirements: [
      { type: AdmissionType.GENERAL_SECONDARY, description: 'Science secondary required; mathematics strong for electrical programs.' },
      { type: AdmissionType.TECHNICAL_DIPLOMA, description: 'Electrical, mechanical, or agricultural technical diplomas.' }
    ],
    tuitionFees: [ { yearRange: 'Years 1-2', amount: 11000 }, { yearRange: 'Years 3-4', amount: 16000 } ],
    scholarships: []
  },

// ================================================================
// 9️⃣ 6TH OF OCTOBER TECHNOLOGICAL UNIVERSITY (OTU) - السادس من أكتوبر
// ================================================================
{
    name: '6th of October Technological University',
    nameAr: 'جامعة السادس من أكتوبر التكنولوجية',
    abbreviation: 'OTU',
    description: 'Strategically located in 6th October City (Greater Cairo west) offering programs in automotive technology, printing/packaging technology, and electronics manufacturing serving major industrial zones like the 10th of Ramadan and 6th of October districts.',
    descriptionAr: 'تقع استراتيجيًا في مدينة السادس من أكتوبر (غرب القاهرة الكبرى) بتقدم برامج في تكنولوجيا السيارات والطباعة والتغليف وتصنيع الإلكترونيات.',
    region: 'Greater Cairo West',
    governorate: 'Giza',
    city: '6th of October City',
    established: 2022,
    type: UniversityType.TECHNOLOGICAL,
    website: 'https://otu.edu.eg',
    logoUrl: 'https://otu.edu.eg/logo.png',
    tuitionMin: 15500,
    tuitionMax: 21000,
    totalStudents: 1900,
    totalFaculty: 100,
    totalPrograms: 13,
    
    faculties: [
      {
        name: 'Faculty of Printing & Packaging Technology',
        nameAr: 'كلية تكنولوجيا الطباعة والتغليف',
        dean: 'Prof. Dr. Ayman Khedr',
        departments: [
          {
            name: 'Graphic Arts & Printing Technology',
            nameAr: 'تكنولوجيا الفنون الجمالية والطباعة',
            coordinator: 'Dr. Samy Fathy',
            specializations: [
              { name: 'Offset Printing Press Operation', nameAr: 'تشغيل آلة طباعة أوفست', icon: '🖨️' },
              { name: 'Flexographic & Digital Label Printing', nameAr: 'طباعة الملصقات فلكسو ورقمية', icon: '🏷️' },
              { name: 'Prepress & Color Management', nameAr: 'ما قبل الطباعة وإدارة الألوان', icon: '🎨' }
            ],
            careers: [
              { title: 'Press Operator', titleAr: 'مشغل مطبعة', icon: '🖨️' },
              { title: 'Color Separation Specialist', titleAr: 'أخصاسي فصل ألوان', icon: '🎨' },
              { title: 'Print Production Planner', titleAr: 'مخطط إنتاج مطباعي', icon: '📅' }
            ]
          },
          {
            name: 'Packaging Materials Technology',
            nameAr: 'تكنولوجيا مواد العبوات',
            coordinator: 'Dr. Noha Mohamed',
            specializations: [
              { name: 'Flexible Packaging Film Extrusion', nameAr: 'بثق أفلام تغليف مرنة', icon: '📦' },
              { name: 'Corrugated Box Production', nameAr: 'إنتاج صناديق كرتوني', icon: '📦' },
              { name: 'Sustainable & Smart Packaging Design', nameAr: 'تصميم عبوات ذكية ومستدامة', icon: '♻️' }
            ],
            careers: [
              { title: 'Packaging Engineer', titleAr: 'مهندس عبوات', icon: '📦' },
              { title: 'Corrugator Machine Operator', titleAr: 'مشغل ماكينة كرتون', icon: '🏭' }
            ]
          }
        ]
      },
      {
        name: 'Faculty of Automotive Technology',
        nameAr: 'كلية تكنولوجيا السيارات',
        dean: 'Prof. Dr. Islam Abdelaziz',
        departments: [
          {
            name: 'Auto Body Repair & Paint Technology',
            nameAr: 'تكنولوجيا إصلاح هيكل السيارات والدهانات',
            coordinator: 'Dr. Osama Ibrahim',
            specializations: [
              { name: 'Auto Body Panel Repair (Collision Repair)', nameAr: 'إصلاح هيكل السيارة بعد التصادم', icon: '🚘' },
              { name: 'Automotive Painting & Surface Finishing', nameAr: 'دهانات السيارات وتلميع الأسطح', icon: '🎨' },
              { name: 'Frame Straightening & Measurement', nameAr: 'تصحيح الهيكل والقياسات', icon: '📏' }
            ],
            careers: [
              { title: 'Body Shop Foreman', titleAr: '_foreman ورشة هيكل', icon: '👷' },
              { title: 'Paint Refinishing Specialist', titleAr: 'أخصائي إعادة طلاء ألوان', icon: '🎨' },
              { title: 'Estimator & Appraiser - Automotive', titleAr: 'مقدر ومثمن قطع غيار', icon: '📝' }
            ]
          },
          {
            name: 'Engine Performance & Diagnostics',
            nameAr: 'أداء المحركات والتشخيص',
            coordinator: 'Dr. Tamer Hamdy',
            specializations: [
              { name: 'Engine Overhaul & Rebuild', nameAr: 'صيانة شاملة للمحركات', icon: '⚙️' },
              { name: 'Modern Diagnostics Using Scanners/OBDII', nameAr: 'تشخيص حديث باستخدام الماسحات/OBDII', icon: '🔧' }
            ]
          }
        ]
      }
    ],
    contacts: [
      { type: ContactType.PHONE, value: '+201111222333', label: 'October City Office' },
      { type: ContactType.EMAIL, value: 'info@otu.edu.eg' }
    ],
    socialLinks: [
      { platform: SocialPlatform.FACEBOOK, url: 'https://facebook.com/october.tech.univ' },
      { platform: SocialPlatform.LINKEDIN, url: 'https://linkedin.com/company/otc-tech-uni' }
    ],
    leadership: [
      { name: 'Prof. Dr. Ayman Khedr', nameAr: 'أ.د. أيمن خضر', position: 'President', displayOrder: 1 },
      { name: 'Prof. Dr. Islam Abdelaziz', nameAr: 'أ.د. إسلام عبد العزيز', position: 'Vice President', displayOrder: 2 }
    ],
    workingHours: [
      { day: DayOfWeek.SUNDAY, openTime: '09:00', closeTime: '15:30' },
      { day: DayOfWeek.MONDAY, openTime: '09:00', closeTime: '15:30' },
      { day: DayOfWeek.TUESDAY, openTime: '09:00', closeTime: '15:30' },
      { day: DayOfWeek.WEDNESDAY, openTime: '09:00', closeTime: '15:30' },
      { day: DayOfWeek.THURSDAY, openTime: '09:00', closeTime: '15:30' },
      { day: DayOfWeek.FRIDAY, isClosed: true },
      { day: DayOfWeek.SATURDAY, openTime: '10:00', closeTime: '13:00' }
    ],
    admissionRequirements: [
      { type: AdmissionType.GENERAL_SECONDARY, description: 'Science/Mathematical secondary track for automotive; Art track for printing.' },
      { type: AdmissionType.TECHNICAL_DIPLOMA, description: 'Auto mechanics, painting, or printing technician diplomas.' }
    ],
    tuitionFees: [ { yearRange: 'Years 1-2', amount: 15500 }, { yearRange: 'Years 3-4', amount: 21000 } ],
    scholarships: []
  },

// ================================================================
// 🔟 EAST CANAL TECHNOLOGICAL UNIVERSITY (ECTU) - إسماعيلية
// ================================================================
{
    name: 'East Canal Technological University',
    nameAr: 'جامعة قناة السويس الشرقية التكنولوجية',
    abbreviation: 'ECTU',
    description: 'Located in Ismailia near the Suez Canal benefiting from logistics corridors, cold chain facilities, and port technologies with specialized focus on refrigeration engineering and cold warehouse management.',
    descriptionAr: 'تقع في إسماعيلية بالقرب من قناة السويس تستفيد من ممرات لوجستيات ومخازن بارد وتقنيات الموانئ مع تركيز على هندسة التثليج وإدارة مخازن التبريد.',
    region: 'Suez Canal Zone',
    governorate: 'Ismailia',
    city: 'Ismailia New City / East Canal Zone',
    established: 2023,
    type: UniversityType.TECHNOLOGICAL,
    website: 'https://ectu.edu.eg',
    logoUrl: 'https://ectu.edu.eg/logo.png',
    tuitionMin: 13500,
    tuitionMax: 18500,
    totalStudents: 1700,
    totalFaculty: 90,
    totalPrograms: 12,
    
    faculties: [
      {
        name: 'Faculty of Cold Chain & Port Technology',
        nameAr: 'كلية تكنولوجيا سلسلة التبريد والموانئ',
        dean: 'Prof. Dr. Tamer El-Gendy',
        departments: [
          {
            name: 'Refrigeration & Air Conditioning Engineering',
            nameAr: 'هندسة التثليج والتكييف',
            coordinator: 'Dr. Emad Mahfouz',
            specializations: [
              { name: 'Commercial & Industrial Refrigeration', nameAr: 'تبريد تجاري وصناعي', icon: '❄️' },
              { name: 'Warehouse Climate Control Systems', nameAr: 'أنظمة تحكم مناخي مخازن', icon: '🏭' },
              { name: 'Cold Chain Logistics (Transport & Monitoring)', nameAr: 'لوجستيات سلسلة التبريد (نقل ومراقبة)', icon: '🚛*' }
            ],
            careers: [
              { title: 'HVAC Systems Designer', titleAr: 'مصمم أنظمة تكييف وتبريد', icon: '❄️' },
              { title: 'Cold Store Facility Manager', titleAr: 'مدير منشأة تخزين بارد', icon: '🧊' },
              { title: 'Port Cold Storage Supervisor', titleAr: 'مشرف مخازن ميناء بارد', icon: '⚓' }
            ]
          },
          {
            name: 'Maritime Logistics Technology',
            nameAr: 'تكنولوجيا اللوجستيات البحرية',
            coordinator: 'Dr. Ashraf Fouad',
            specializations: [
              { name: 'Container Freight Station Operations', nameAr: 'عمليات محطات الحاويات البحرية', icon: '🚢' },
              { name: 'Dry Port Management', nameAr: 'إدارة الموانئ الجافة', icon: '🏗️' }
            ]
          }
        ]
      }
    ],
    contacts: [
      { type: ContactType.PHONE, value: '+20641234567', label: 'Ismailia Main' },
      { type: ContactType.EMAIL, value: 'info@ectu.edu.eg' }
    ],
    socialLinks: [{ platform: SocialPlatform.FACEBOOK, url: 'https://facebook.com/east.canal.tech.univ' }],
    leadership: [
      { name: 'Prof. Dr. Tamer El-Gendy', nameAr: 'أ.د. طامر الجندي', position: 'President', displayOrder: 1 }
    ],
    workingHours: [
      { day: DayOfWeek.SUNDAY, openTime: '08:30', closeTime: '15:00' },
      { day: DayOfWeek.MONDAY, openTime: '08:30', closeTime: '15:00' },
      { day: DayOfWeek.TUESDAY, openTime: '08:30', closeTime: '15:00' },
      { day: DayOfWeek.WEDNESDAY, openTime: '08:30', closeTime: '15:00' },
      { day: DayOfWeek.THURSDAY, openTime: '08:30', closeTime: '15:00' },
      { day: DayOfWeek.FRIDAY, isClosed: true },
      { day: DayOfWeek.SATURDAY, openTime: '09:00', closeTime: '12:00' }
    ],
    admissionRequirements: [
      { type: AdmissionType.GENERAL_SECONDARY, description: 'Science secondary certificate essential for HVAC/mechanical courses.' },
      { type: AdmissionType.TECHNICAL_DIPLOMA, description: 'Refrigeration or mechanical/ logistics diplomas.' }
    ],
    tuitionFees: [ { yearRange: 'Years 1-2', amount: 13500 }, { yearRange: 'Years 3-4', amount: 18500 } ],
    scholarships: []
  },

// ================================================================
// 1️⃣1️⃣ MINYA TECHNOLOGICAL UNIVERSITY (MTU) - المنيا
// ================================================================
{
    name: 'Minya Technological University',
    nameAr: 'جامعة المنيا التكنولوجية',
    abbreviation: 'MTU',
    description: 'Serving Middle Egypt capital region with focus on ceramics technology, brick-making, and agro-processing utilizing the area\'s clay deposits and agricultural abundance between north and upper Egypt regions.',
    descriptionAr: 'تخدم عاصمة مصر الوسطى مع تركيز على تكنولوجيا السيراميك وطوب الحريق ومعالجات زراعية مستفيدة من رواسب طينية المنيا ووفرة المحاصيل الزراعية بين شمال وجنوب مصر.',
    region: 'Middle Egypt',
    governorate: 'Minya',
    city: 'Minya New City',
    established: 2023,
    type: UniversityType.TECHNOLOGICAL,
    website: 'https://mtu.edu.eg',
    logoUrl: 'https://mtu.edu.eg/logo.png',
    tuitionMin: 11800,
    tuitionMax: 16800,
    totalStudents: 1300,
    totalFaculty: 70,
    totalPrograms: 9,
    
    faculties: [
      {
        name: 'Faculty of Ceramics & Construction Materials',
        nameAr: 'كلية السيراميك ومواد البناء',
        dean: 'Prof. Dr. Wael Nassar',
        departments: [
          {
            name: 'Ceramics Technology',
            nameAr: 'تكنولوجيا السيراميك',
            coordinator: 'Dr. Hazem Samy',
            specializations: [
              { name: 'Tableware & Sanitary Ware Ceramics', nameAr: 'سيراميك الأواني الصحية والأطباق', icon: '🍽️' },
              { name: 'Clay Body Preparation & Forming', nameAr: 'إعداد جسم الطين والتشكيل', icon: '🏺' },
              { name: 'Glazing & Kiln Technology', nameAr: 'تقنيات التزجيت والأفرن', icon: '🔥' }
            ],
            careers: [
              { title: 'Ceramics Process Engineer', titleAr: 'مهندس عمليات سيراميك', icon: '🧱' },
              { title: 'Quality Controller - Ceramic Factories', titleAr: 'مراقب جودة مصانع سيراميك', icon: '✅' }
            ]
          },
          {
            name: 'Building Brick Manufacturing Technology',
            nameAr: 'تكنولوجيا تصنيع طوب البناء',
            coordinator: 'Dr. Gamal Hosni',
            specializations: [
              { name: 'Red Clay Brick Production (Automatic)', nameAr: 'إنتاج الطوب الأحمر (آلي)', icon: '🧱' },
              { name: 'Fly Ash Concrete Block Technology', nameAr: 'تكنولوجيا بلوكات خرسانية بالرماد المتطاير', icon: '🧱' }
            ]
          }
        ]
      },
      {
        name: 'Faculty of Agro-Processing Technology',
        nameAr: 'كلية تكنولوجيا المعالجات الزراعية',
        dean: 'Prof. Dr. Magda Kamal',
        departments: [
          {
            name: 'Grain Milling & Silo Management',
            nameAr: 'تكنولوجيا طحن الحبوب وإدارة الصوامع',
            coordinator: 'Dr. Salah Abdel Rahman',
            specializations: [
              { name: 'Flour Milling Technology', nameAr: 'تكنولوجيا طحن الدقيق', icon: '🌾' },
              { name: 'Storage Pest Control & Grain Safety', nameAr: 'مكافحة آفات مخزن وسلامة الحبوب', icon: '🛡️' }
            ]
          },
          {
            name: 'Edible Oils & Soap Production',
            nameAr: 'تكنولوجيا زيوت الطعام الصالحة للإنسان والصابون',
            coordinator: 'Dr. Ayat Hassan',
            specializations: [
              { name: 'Vegetable Oil Extraction & Refining', nameAr: 'استخراج وتكرير الزيوت الخضرية', icon: '🫒' },
              { name: 'Soap & Detergent Manufacturing', nameAr: 'تصنيع الصابون والمنظفات', icon: '🧴' }
            ]
          }
        ]
      }
    ],
    contacts: [
      { type: ContactType.PHONE, value: '+20861234567', label: 'Minya Office' },
      { type: ContactType.EMAIL, value: 'info@mtu.edu.eg' }
    ],
    socialLinks: [{ platform: SocialPlatform.FACEBOOK, url: 'https://facebook.com/minya.tech.univ' }],
    leadership: [
      { name: 'Prof. Dr. Wael Nassar', nameAr: 'أ.د. وائل نصار', position: 'President', displayOrder: 1 },
      { name: 'Prof. Dr. Magda Kamal', nameAr: 'أ.د. مجد كمال', position: 'VP', displayOrder: 2 }
    ],
    workingHours: [
      { day: DayOfWeek.SUNDAY, openTime: '08:00', closeTime: '14:30' },
      { day: DayOfWeek.MONDAY, openTime: '08:00', closeTime: '14:30' },
      { day: DayOfWeek.TUESDAY, openTime: '08:00', closeTime: '14:30' },
      { day: DayOfWeek.WEDNESDAY, openTime: '08:00', closeTime: '14:30' },
      { day: DayOfWeek.THURSDAY, openTime: '08:00', closeTime: '14:30' },
      { day: DayOfWeek.FRIDAY, isClosed: true },
      { day: DayOfWeek.SATURDAY, openTime: '09:00', closeTime: '12:00' }
    ],
    admissionRequirements: [
      { type: AdmissionType.GENERAL_SECONDARY, description: 'All branches accepted; chemistry useful for ceramics; biology for agro.' },
      { type: AdmissionType.TECHNICAL_DIPLOMA, description: 'Ceramics, brick, milling, or oils production diploma.' }
    ],
    tuitionFees: [ { yearRange: 'Years 1-2', amount: 11800 }, { yearRange: 'Years 3-4', amount: 16800 } ],
    scholarships: []
  },

// ================================================================
// 1️⃣2️⃣ SOUTH VALLEY TECHNOLOGICAL UNIVERSITY (SVTU) - الأقصر
// ================================================================
{
    name: 'South Valley Technological University',
    nameAr: 'جامعة الوادي التكنولوجية',
    abbreviation: 'SVTU',
    description: 'Located in Luxor (ancient Thebes) uniquely specializing in heritage restoration technology, antiquities preservation science, and eco-cultural tourism management preserving Egypt\'s world-famous monuments.',
    descriptionAr: 'تقع في الأقصر (طيبة القديمة) بشكل فريد تتخصص في تكنولوجيا ترميم التراث وحفظ الآثار العلمي وإدارة السياحة الثقافية البيئية للحافظ على آثار مصر العالمية الشهيرة.',
    region: 'Upper Egypt South',
    governorate: 'Luxor',
    city: 'Luxor New City',
    established: 2023,
    type: UniversityType.TECHNOLOGICAL,
    website: 'https://svtu.edu.eg',
    logoUrl: 'https://svtu.edu.eg/logo.png',
    tuitionMin: 10500,
    tuitionMax: 15500,
    totalStudents: 1100,
    totalFaculty: 60,
    totalPrograms: 8,
    
    faculties: [
      {
        name: 'Faculty of Heritage Restoration & Antiquities Technology',
        nameAr: 'كلية ترميم التراث وتكنولوجيا الآثار',
        dean: 'Prof. Dr. Essam Abbas',
        departments: [
          {
            name: 'Archaeological Restoration Technology',
            nameAr: 'تكنولوجيا الترميم الآثاري',
            coordinator: 'Dr. Mohsen Fathi',
            specializations: [
              { name: 'Stone Monuments Conservation', nameAr: 'حفظ الآثار الحجرية', icon: '🏺' },
              { name: 'Wood & Organic Material Restoration', nameAr: 'ترميم المواد العضوية والخشبية', icon: '🪵' },
              { name: 'Ancient Wall Paintings & Mural Restoration', nameAr: 'ترميم الرسومات الجدارية القديمة والجداريات', icon: '🎨' }
            ],
            careers: [
              { title: 'Monument Restorer', titleAr: 'مرمّم آثار', icon: '🏺' },
              { title: 'Museum Conservator - Objects Division', titleAr: 'محفظ متحف - قسم القطع', icon: '🖼️' },
              { title: 'Site Preservation Manager', titleAr: 'مدير حفظ مواقع أثرية', icon: '🛡️' }
            ]
          },
          {
            name: 'Digital Heritage Documentation',
            nameAr: 'توثيق التراث الرقمي',
            coordinator: 'Dr. Dina Maher',
            specializations: [
              { name: 'Photogrammetry for Archaeology', nameAr: 'فوتوغراميتريا للأثار', icon: '📸' },
              { name: '3D Modeling of Ancient Structures', nameAr: 'نمذجة ثلاثية الأبعاد للهياكل الأثرية', icon: '🕶️' },
              { name: 'Virtual Museum Creation', nameAr: 'إنشاء المتاحف الافتراضي', icon: '🥽' }
            ]
          }
        ]
      },
      {
        name: 'Faculty of Eco-Cultural Tourism Technology',
        nameAr: 'كلية تكنولوجيا السياحة الثقافية البيئية',
        dean: 'Prof. Dr. Naglaa Fouad',
        departments: [
          {
            name: 'Heritage Guide & Cultural Management',
            nameAr: 'الإرشاد السياحي والثقافي وإدارة التراث',
            coordinator: 'Dr. Safaa Ibrahim',
            specializations: [
              { name: 'Archaeological Site Presentation', nameAr: 'عرض المواقع الأثرية', icon: '🏛️' },
              { name: 'Sustainable Tourism Practices', nameAr: 'ممارسات السياحة المستدامة', icon: '🌿' }
            ]
          },
          {
            name: 'Handicrafts & Traditional Art Technology',
            nameAr: 'تكنولوجيا الحرف التقليدية والفنون التقليدية',
            coordinator: 'Dr. Fatima Zahran',
            specializations: [
              { name: 'Alabaster Carving (Luxor Specialty)', nameAr: 'نحت الحجر الجيري (تخصص الأقصر)', icon: '🗿' },
              { name: 'Pottery Revival Methods', nameAr: 'طرق إحياء صناعة الفخار', icon: '🏺' }
            ]
          }
        ]
      }
    ],
    contacts: [
      { type: ContactType.PHONE, value: '+20951234567', label: 'Luxor Office' },
      { type: ContactType.EMAIL, value: 'info@svtu.edu.eg' }
    ],
    socialLinks: [{ platform: SocialPlatform.FACEBOOK, url: 'https://facebook.com/south.valley.tech.univ' }],
    leadership: [
      { name: 'Prof. Dr. Essam Abbas', nameAr: 'أ.د. عصام عباس', position: 'President', displayOrder: 1 },
      { name: 'Prof. Dr. Naglaa Fouad', nameAr: 'أ.د. نجلاء فؤاد', position: 'Vice President', displayOrder: 2 }
    ],
    workingHours: [
      { day: DayOfWeek.SUNDAY, openTime: '08:00', closeTime: '14:00' },
      { day: DayOfWeek.MONDAY, openTime: '08:00', closeTime: '14:00' },
      { day: DayOfWeek.TUESDAY, openTime: '08:00', closeTime: '14:00' },
      { day: DayOfWeek.WEDNESDAY, openTime: '08:00', closeTime: '14:00' },
      { day: DayOfWeek.THURSDAY, openTime: '08:00', closeTime: '14:00' },
      { day: DayOfWeek.FRIDAY, isClosed: true },
      { day: DayOfWeek.SATURDAY, openTime: '09:00', closeTime: '12:00' }
    ],
    admissionRequirements: [
      { type: AdmissionType.GENERAL_SECONDARY, description: 'Literary/Humanities branch acceptable for heritage/tourism; Science for digital documentation.' },
      { type: AdmissionType.TECHNICAL_DIPLOMA, description: 'Restoration, guiding, or handicraft technical diploma appreciated.' }
    ],
    tuitionFees: [ { yearRange: 'Years 1-2', amount: 10500 }, { yearRange: 'Years 3-4', amount: 15500 } ],
    scholarships: []
  },

// ================================================================
// 1️⃣3️⃣ BENHA TECHNOLOGICAL UNIVERSITY (BTU) - بنها
// ================================================================
{
    name: 'Benha Technological University',
    nameAr: 'جامعة بنها التكنولوجية',
    abbreviation: 'BTU',
    description: 'Serving the industrial heartland of Qalyubia governorate providing education in electronics manufacturing, automotive components, and assembly line automation feeding into Greater Cairo\'s sprawling industrial areas including Shoubra, Qalyub, and Khanka.',
    descriptionAr: 'تخدم قلب الصناعي في محافظة القليوبية بتوفير تعليم في تصنيع الإلكترونيات وقطع الغيار وأتمتة خطوط التجميع التي تغذي المناطق الصناعية الواسعة في شبرا والقليوب وخانكا.',
    region: 'Delta Central',
    governorate: 'Qalyubia',
    city: 'Benha New City',
    established: 2022,
    type: UniversityType.TECHNOLOGICAL,
    website: 'https://btu.edu.eg',
    logoUrl: 'https://btu.edu.eg/logo.png',
    tuitionMin: 14500,
    tuitionMax: 19500,
    totalStudents: 2000,
    totalFaculty: 105,
    totalPrograms: 14,
    
    faculties: [
      {
        name: 'Faculty of Electronics Assembly & Manufacturing',
        nameAr: 'كلية تجميع الإلكترونيات والتصنيع',
        dean: 'Prof. Dr. Tarek Refaat',
        departments: [
          {
            name: 'PCB Assembly & SMT Technology',
            nameAr: 'تكنولوجية تجميع الدوائر المطبوعة والتثبيط السطحي',
            coordinator: 'Dr. Emad Abdelhamid',
            specializations: [
              { name: 'Surface Mount Technology (SMT)', nameAr: 'تقنولوجية التثبيت السطحي', icon: '🔌' },
              { name: 'Through-Hole Technology (THT)', nameAr: 'تقنالثقطة الأخذير (THT)', icon: '🔩' },
              { name: 'Electronic Component Testing & QC', nameAr: 'اختبار المكونات الإلكترونية ومراقبة الجودة', icon: '🔬' }
            ],
            careers: [
              { title: 'SMT Machine Operator', titleAr: 'مشغل ماكينة SMT', icon: '🤖' },
              { title: 'PCB Assembly Line Supervisor', titleAr: 'مشرف خط تجميع PCB', icon: '👷' },
              { title: 'Test & Inspection Engineer', titleAr: 'مهندس اختبار وفحص', icon: '🔍' }
            ]
          },
          {
            name: 'Automotive Components Manufacturing',
            nameAr: 'تصنيع مكونات السيارات',
            coordinator: 'Dr. Hossam El-Shamy',
            specializations: [
              { name: 'Brake System Assembly', nameAr: 'تجميع نظام الفرامل', icon: '🛑' },
              { name: 'Headlight/Lighting Manufacturing', nameAr: 'تصنيع الإضاءة الأمامية', icon: '💡' },
              { name: 'Wire Harness Assembly for Vehicles', nameAr: 'تجميع أسلاك كهربية للمركبات', icon: '🔌' }
            ]
          }
        ]
      }
    ],
    contacts: [
      { type: ContactType.PHONE, value: '+201333444555', label: 'Benha Office' },
      { type: ContactType.EMAIL, value: 'info@btu.edu.eg' }
    ],
    socialLinks: [
      { platform: SocialPlatform.FACEBOOK, url: 'https://facebook.com/benha.tech.univ' },
      { platform: SocialPlatform.LINKEDIN, url: 'https://linkedin.com/company/benha-tech-u' }
    ],
    leadership: [
      { name: 'Prof. Dr. Tarek Refaat', nameAr: 'أ.د. طارق رفعت', position: 'President', displayOrder: 1 }
    ],
    workingHours: [
      { day: DayOfWeek.SUNDAY, openTime: '08:30', closeTime: '15:00' },
      { day: DayOfWeek.MONDAY, openTime: '08:30', closeTime: '15:00' },
      { day: DayOfWeek.TUESDAY, openTime: '08:30', closeTime: '15:00' },
      { day: DayOfWeek.WEDNESDAY, openTime: '08:30', closeTime: '15:00' },
      { day: DayOfWeek.THURSDAY, openTime: '08:30', closeTime: '15:00' },
      { day: DayOfWeek.FRIDAY, isClosed: true },
      { day: DayOfWeek.SATURDAY, openTime: '10:00', closeTime: '13:00' }
    ],
    admissionRequirements: [
      { type: AdmissionType.GENERAL_SECONDARY, description: 'Science/Mathematics track mandatory for electronic programs.' },
      { type: AdmissionType.TECHNICAL_DIPLOMA, description: 'Electronics or communications or automotive technical diploma.' }
    ],
    tuitionFees: [ { yearRange: 'Years 1-2', amount: 14500 }, { yearRange: 'Years 3-4', amount: 19500 } ],
    scholarships: []
  },

// ================================================================
// 1️⃣4️⃣ KAFR EL SHEIKH TECHNOLOGICAL UNIVERSITY (KSTU) - كفر الشيخ
// ================================================================
{
    name: 'Kafr El Sheikh Technological University',
    nameAr: 'جامعة كفر الشيخ التكنولوجية',
    abbreviation: 'KSTU',
    description: 'Located in Egypt\'s fish farming hub province providing specialized aquaculture technology, fisheries processing, feed formulation, and food safety quality control programs supporting one of the nation\'s most important agri-food sectors.',
    descriptionAr: 'تقع في محافظة كفر الشيخ (مركز أسماك مصر البرمجي) توفر برامج متخصصة في تكنولوجيا الاستزراع السمكي ومعالجة الأسماك وتصنيع أعلاف الأسماك ومراقبة جودة الغذاء.',
    region: 'Delta Northwest',
    governorate: 'Kafr El Sheikh',
    city: 'Kafr El Sheikh New City',
    established: 2023,
    type: UniversityType.TECHNOLOGICAL,
    website: 'https://kstu.edu.eg',
    logoUrl: 'https://kstu.edu.eg/logo.png',
    tuitionMin: 11200,
    tuitionMax: 16200,
    totalStudents: 1000,
    totalFaculty: 55,
    totalPrograms: 7,
    
    faculties: [
      {
        name: 'Faculty of Aquaculture & Fisheries Processing',
        nameAr: 'كلية تكنولوجيا الاستزراع السمكي ومعالجة الأسماك',
        dean: 'Prof. Dr. Khaled Ismail',
        departments: [
          {
            name: 'Aquaculture Engineering Technology',
            nameAr: 'هندسة تكنولوجيا الاستزراع السمكي',
            coordinator: 'Dr. Mamdouh Maher',
            specializations: [
              { name: 'Recirculating Aquaculture Systems (RAS)', nameAr: 'أنظمة الاستزراع المسجد الدوراني', icon: '♻️' },
              { name: 'Biofloc Technology for Intensive Fish Farming', nameAr: 'تقنية الكتلة الحيوية للأسماك المكثفة', icon: '🐟' },
              { name: 'Integrated Pest Management (Aquatic)', nameAr: 'الإدارة المتكاملة للآفات في المزارع المائية', icon: '🦠' }
            ],
            careers: [
              { title: 'Fish Farm Manager', titleAr: 'مدير مزرعة أسماك', icon: '🐟' },
              { title: 'Water Quality Technician (Aquaculture)', titleAr: 'فني جودة مياه (استزراع سمكي)', icon: '💧' },
              { title: 'Feed Formulation Specialist (Aquafeed)', titleAr: 'أخصائي تركيب أعلاف (سمكية)', icon: '🌾' }
            ]
          },
          {
            name: 'Fisheries Processing & Value Addition',
            nameAr: 'معالجة الأسماك وإضافة القيمة',
            coordinator: 'Dr. Raafat Amin',
            specializations: [
              { name: 'Fish Canning Technology (Thermal Processing)', nameAr: 'تكنولوجيا تعليب الأسماك (معالجة حرارية)', icon: '🥫' },
              { name: 'Surimi & Minced Fish Products', nameAr: 'منتجات سريمي والأسماك المفروم', icon: '🍤' },
              { name: 'Fish Meal & Oil Rendering', nameAr: 'استخلاص زيت وكسبة الأسماك', icon: '🫒' }
            ],
            careers: [
              { title: 'Cannery Plant Supervisor', titleAr: 'مشرف مصنع تعليب أسماك', icon: '🥫' },
              { title: 'Quality Control Lab - Seafood', titleAr: 'مختبر جودة - بحريات', icon: '🔬' }
            ]
          }
        ]
      },
      {
        name: 'Faculty of Food Safety & Quality Systems',
        nameAr: 'كلية سلامة الغذاء وأنظمة الجودة',
        dean: 'Prof. Dr. Azza Khalil',
        departments: [
          {
            name: 'Food Safety & Quality Control Labs',
            nameAr: 'مختبرات سلامة الغذاء ومراقبة الجودة',
            coordinator: 'Dr. Sally Ahmed',
            specializations: [
              { name: 'HACCP Implementation & Auditing', nameAr: 'تنفيذ وتدقيق نظام هاسب', icon: '✅' },
              { name: 'Microbiological Analysis of Foods', nameAr: 'التحليل الميكروبيولوجي للأغذية', icon: '🦠' },
              { name: 'Chemical Residue Detection (Pesticides etc.)', nameAr: 'كشف بقايا كيميائية (مبيدات ...)', icon: '🔬' }
            ]
          }
        ]
      }
    ],
    contacts: [
      { type: ContactType.PHONE, value: '+20473456789', label: 'KFS Main Office' },
      { type: ContactType.EMAIL, value: 'info@kstu.edu.eg' }
    ],
    socialLinks: [
      { platform: SocialPlatform.FACEBOOK, url: 'https://facebook.com/kfs.tech.university' },
      { platform: SocialPlatform.INSTAGRAM, url: 'https://instagram.com/kstu.aquaculture' }
    ],
    leadership: [
      { name: 'Prof. Dr. Khaled Ismail', nameAr: 'أ.د. خالد إسماعيل', position: 'President', displayOrder: 1 },
      { name: 'Prof. Dr. Azza Khalil', nameAr: 'أ.د. عزة خليل', position: 'Dean - Food Safety', displayOrder: 2 }
    ],
    workingHours: [
      { day: DayOfWeek.SUNDAY, openTime: '08:00', closeTime: '14:30' },
      { day: DayOfWeek.MONDAY, openTime: '08:00', closeTime: '14:30' },
      { day: DayOfWeek.TUESDAY, openTime: '08:00', closeTime: '14:30' },
      { day: DayOfWeek.WEDNESDAY, openTime: '08:00', closeTime: '14:30' },
      { day: DayOfWeek.THURSDAY, openTime: '08:00', closeTime: '14:30' },
      { day: DayOfWeek.FRIDAY, isClosed: true },
      { day: DayOfWeek.SATURDAY, openTime: '09:00', closeTime: '12:00' }
    ],
    admissionRequirements: [
      { type: AdmissionType.GENERAL_SECONDARY, description: 'Biology/Chemistry strongly recommended for aquaculture programs.' },
      { type: AdmissionType.TECHNICAL_DIPLOMA, description: 'Veterinary medicine, fisheries, or food technology diploma preferred.' }
    ],
    tuitionFees: [ { yearRange: 'Years 1-2', amount: 11200 }, { yearRange: 'Years 3-4', amount: 16200 } ],
    scholarships: []
  }
];
