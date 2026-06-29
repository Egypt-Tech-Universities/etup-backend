import { DataSource } from 'typeorm';
import { ChatIntent } from '../../modules/chatbot/domain/entities/chat-intent.entity';
import { IntentName } from '../../modules/chatbot/domain/enums/intent-name.enum';

export const INTENTS_SEED = [
  // ========================================
  // GREETINGS
  // ========================================
  {
    name: IntentName.GREETING,
    displayName: 'Greeting',
    patterns: [
      'hi', 'hello', 'hey', 'good morning', 'good evening',
      'مرحبا', 'السلام عليكم', 'اهلا', 'صباح الخير', 'مساء الخير',
    ],
    responses: [
      'Hello! 👋 Welcome to the Egyptian Technological Universities Portal. How can I help you today?',
      'Hi there! I\'m your AI assistant. Ask me about universities, programs, admission, or fees!',
      'Welcome! I can help you explore Egypt\'s 14 technological universities. What would you like to know?',
    ],
    responsesAr: [
      'مرحبًا! 👋 أهلًا بك في بوابة الجامعات التكنولوجية المصرية. كيف يمكنني مساعدتك؟',
      'أهلًا! أنا المساعد الذكي. اسألني عن الجامعات، البرامج، القبول، أو الرسوم!',
      'مرحبًا بك! يمكنني مساعدتك في استكشاف الـ 14 جامعة تكنولوجية في مصر. ماذا تريد أن تعرف؟',
    ],
    followUpSuggestions: [
      'What universities are available?',
      'Tell me about programs',
      'How can I apply?',
    ],
    priority: 100,
    requiresData: false,
  },

  // ========================================
  // GOODBYE
  // ========================================
  {
    name: IntentName.GOODBYE,
    displayName: 'Goodbye',
    patterns: [
      'bye', 'goodbye', 'see you', 'thanks bye', 'thank you bye',
      'مع السلامة', 'وداعا', 'باي', 'الى اللقاء',
    ],
    responses: [
      'Goodbye! 👋 Feel free to come back anytime if you have more questions.',
      'Bye! Good luck with your educational journey! 🎓',
      'See you later! Don\'t hesitate to ask if you need anything else.',
    ],
    responsesAr: [
      'مع السلامة! 👋 لا تتردد في العودة إذا كان لديك أي أسئلة أخرى.',
      'وداعًا! بالتوفيق في رحلتك التعليمية! 🎓',
      'إلى اللقاء! لا تتردد في السؤال إذا احتجت أي شيء.',
    ],
    priority: 95,
  },

  // ========================================
  // THANKS
  // ========================================
  {
    name: IntentName.THANKS,
    displayName: 'Thanks',
    patterns: [
      'thanks', 'thank you', 'thx', 'appreciate it',
      'شكرا', 'متشكر', 'مشكور', 'تسلم',
    ],
    responses: [
      'You\'re welcome! 😊 Happy to help!',
      'My pleasure! Is there anything else I can help you with?',
      'Anytime! Feel free to ask more questions.',
    ],
    responsesAr: [
      'العفو! 😊 يسعدني مساعدتك!',
      'لا شكر على واجب! هل هناك شيء آخر يمكنني مساعدتك به؟',
      'في أي وقت! اسأل عن أي شيء.',
    ],
    priority: 90,
  },

  // ========================================
  // ABOUT UNIVERSITIES (general)
  // ========================================
  {
    name: IntentName.ABOUT_UNIVERSITIES,
    displayName: 'About Universities',
    patterns: [
      'about universities', 'tell me about', 'what is technological university',
      'الجامعات التكنولوجية', 'ما هي الجامعة', 'عن الجامعات',
    ],
    responses: [
      'Egypt has 14 Technological Universities offering practical, industry-focused education. They follow a 4-year (2+2) system: Higher Diploma after 2 years, then Bachelor\'s degree after 4 years. 80% of seats are reserved for technical diploma holders.',
      'Technological universities in Egypt are specialized institutions focused on applied sciences and modern technology. They prepare graduates for the workforce with hands-on training and industry partnerships.',
    ],
    responsesAr: [
      'يوجد في مصر 14 جامعة تكنولوجية تقدم تعليمًا عمليًا موجهًا للصناعة. تتبع نظام 4 سنوات (2+2): دبلوم عالي بعد سنتين، ثم بكالوريوس بعد 4 سنوات. 80% من المقاعد محجوزة لخريجي الدبلومات الفنية.',
      'الجامعات التكنولوجية في مصر مؤسسات متخصصة تركز على العلوم التطبيقية والتكنولوجيا الحديثة. تعد الخريجين لسوق العمل بتدريب عملي وشراكات صناعية.',
    ],
    followUpSuggestions: [
      'List all universities',
      'What programs are offered?',
      'How to apply?',
    ],
    priority: 80,
  },

  // ========================================
  // LIST UNIVERSITIES (with data)
  // ========================================
  {
    name: IntentName.LIST_UNIVERSITIES,
    displayName: 'List Universities',
    patterns: [
      'list universities', 'show universities', 'what universities', 'available universities', 'which universities',
      'قائمة الجامعات', 'اعرض الجامعات', 'ما هي الجامعات', 'الجامعات المتاحة',
    ],
    responses: [
      'Here are some of the Technological Universities in Egypt:\n\n{universities}\n\nWe have 14 in total across different regions!',
    ],
    responsesAr: [
      'إليك بعض الجامعات التكنولوجية في مصر:\n\n{universities}\n\nلدينا 14 جامعة في المجمل في مناطق مختلفة!',
    ],
    followUpSuggestions: [
      'Tell me about NCTU',
      'What programs do they offer?',
      'Show me university locations',
    ],
    priority: 75,
    requiresData: true,
    dataSource: 'universities',
  },

  // ========================================
  // UNIVERSITY LOCATION
  // ========================================
  {
    name: IntentName.UNIVERSITY_LOCATION,
    displayName: 'University Location',
    patterns: [
      'location', 'where is', 'address', 'where are universities',
      'موقع', 'فين', 'عنوان', 'مكان الجامعة',
    ],
    responses: [
      'Egyptian Technological Universities are spread across major cities:\n• Greater Cairo (NCTU, OTU)\n• Alexandria (BATU)\n• Delta (DTU, BTU, KSTU)\n• Suez Canal (STU, ECTU)\n• Upper Egypt (ATU, ShTU, QTU, SVTU, MTU)\n• Red Sea (ZTU)',
    ],
    responsesAr: [
      'الجامعات التكنولوجية المصرية منتشرة في المدن الكبرى:\n• القاهرة الكبرى (NCTU, OTU)\n• الإسكندرية (BATU)\n• الدلتا (DTU, BTU, KSTU)\n• قناة السويس (STU, ECTU)\n• صعيد مصر (ATU, ShTU, QTU, SVTU, MTU)\n• البحر الأحمر (ZTU)',
    ],
    priority: 70,
  },

  // ========================================
  // LIST PROGRAMS (with data)
  // ========================================
  {
    name: IntentName.LIST_PROGRAMS,
    displayName: 'List Programs',
    patterns: [
      'programs', 'majors', 'what programs', 'show programs', 'available programs', 'specializations',
      'برامج', 'تخصصات', 'ما هي البرامج', 'اعرض التخصصات',
    ],
    responses: [
      'Here are some popular programs offered:\n\n{programs}\n\nWe have programs in IT, Engineering, Energy, Health Sciences, Business, and more!',
    ],
    responsesAr: [
      'إليك بعض البرامج المتاحة:\n\n{programs}\n\nلدينا برامج في تكنولوجيا المعلومات، الهندسة، الطاقة، العلوم الصحية، الأعمال، والمزيد!',
    ],
    followUpSuggestions: [
      'Tell me about IT program',
      'Show me Mechatronics',
      'What about Petroleum?',
    ],
    priority: 75,
    requiresData: true,
    dataSource: 'programs',
  },

  // ========================================
  // PROGRAM INFO
  // ========================================
  {
    name: IntentName.PROGRAM_INFO,
    displayName: 'Program Information',
    patterns: [
      'tell me about program', 'what is IT', 'what is mechatronics', 'what is petroleum',
      'about program', 'program details',
      'اخبرني عن', 'ما هو', 'معلومات عن البرنامج', 'تفاصيل البرنامج',
    ],
    responses: [
      'Our programs are 4-year Bachelor degrees with hands-on training. Most include industry partnerships, lab work, and internships. Would you like to know about a specific program? Examples: IT, Mechatronics, Renewable Energy, Petroleum, Prosthetics.',
    ],
    responsesAr: [
      'برامجنا 4 سنوات بكالوريوس مع تدريب عملي. معظمها يشمل شراكات صناعية، عمل معملي، وتدريب ميداني. هل تريد معرفة برنامج معين؟ أمثلة: تكنولوجيا المعلومات، الميكاترونيكس، الطاقة المتجددة، البترول، الأطراف الصناعية.',
    ],
    priority: 65,
  },

  // ========================================
  // PROGRAM CAREERS
  // ========================================
  {
    name: IntentName.PROGRAM_CAREERS,
    displayName: 'Career Opportunities',
    patterns: [
      'career', 'job', 'work', 'salary', 'employment', 'jobs after graduation',
      'وظائف', 'شغل', 'مرتب', 'فرص عمل', 'العمل بعد التخرج',
    ],
    responses: [
      'Our graduates work in high-demand fields:\n\n💻 IT: Software Developer, Network Engineer, Cybersecurity Analyst\n🤖 Mechatronics: Automation Engineer, Robotics Engineer\n🚗 Autotronics: Automotive Engineer, EV Technician\n☀️ Renewable Energy: Solar Designer, Energy Auditor\n🛢️ Petroleum: Petroleum Engineer, Drilling Engineer\n🦿 Prosthetics: Prosthetist, Medical Device Specialist\n\nSalaries range from 6,000 to 35,000 EGP/month depending on specialization.',
    ],
    responsesAr: [
      'خريجونا يعملون في مجالات عالية الطلب:\n\n💻 تكنولوجيا المعلومات: مطور برمجيات، مهندس شبكات\n🤖 الميكاترونيكس: مهندس أتمتة، مهندس روبوتات\n🚗 إلكترونيات السيارات: مهندس سيارات\n☀️ الطاقة المتجددة: مصمم طاقة شمسية\n🛢️ البترول: مهندس بترول، مهندس حفر\n🦿 الأطراف الصناعية: أخصائي أطراف صناعية\n\nالمرتبات تتراوح من 6,000 إلى 35,000 جنيه شهريًا حسب التخصص.',
    ],
    priority: 70,
  },

  // ========================================
  // ADMISSION REQUIREMENTS
  // ========================================
  {
    name: IntentName.ADMISSION_REQUIREMENTS,
    displayName: 'Admission Requirements',
    patterns: [
      'admission', 'requirements', 'who can apply', 'eligibility', 'qualifications',
      'قبول', 'شروط القبول', 'مين يقدم', 'مؤهلات',
    ],
    responses: [
      'Admission requirements:\n\n📚 General Secondary (Thanaweya Amma):\n• Science or Math track preferred\n• Total grade meets minimum cutoff\n• Only 20% of seats available\n\n🎓 Technical Diploma Holders:\n• 3 or 5-year technical diploma\n• 80% of seats reserved for them\n• Must be in related field for some programs',
    ],
    responsesAr: [
      'شروط القبول:\n\n📚 الثانوية العامة:\n• شعبة علمية أو رياضية مفضلة\n• المجموع يحقق الحد الأدنى\n• 20% فقط من المقاعد متاحة\n\n🎓 خريجي الدبلومات الفنية:\n• دبلوم فني 3 أو 5 سنوات\n• 80% من المقاعد محجوزة لهم\n• يجب أن يكون في مجال مرتبط لبعض البرامج',
    ],
    followUpSuggestions: [
      'How can I apply?',
      'What documents do I need?',
      'When does application open?',
    ],
    priority: 85,
  },

  // ========================================
  // HOW TO APPLY
  // ========================================
  {
    name: IntentName.HOW_TO_APPLY,
    displayName: 'How to Apply',
    patterns: [
      'how to apply', 'application process', 'how can i apply', 'apply', 'registration',
      'كيف اقدم', 'ازاي اقدم', 'التقديم', 'كيفية التسجيل',
    ],
    responses: [
      'How to apply:\n\n1️⃣ Visit the Tansik (national coordination) website\n2️⃣ Submit your secondary certificate or diploma\n3️⃣ Choose your preferred universities and programs\n4️⃣ Wait for the coordination results\n5️⃣ Complete enrollment at the assigned university\n\nApplication usually opens in July-August each year. Check university websites for direct admission programs.',
    ],
    responsesAr: [
      'كيفية التقديم:\n\n1️⃣ زيارة موقع التنسيق (مكتب التنسيق الوطني)\n2️⃣ تقديم شهادة الثانوية أو الدبلومة\n3️⃣ اختيار الجامعات والبرامج المفضلة\n4️⃣ انتظار نتائج التنسيق\n5️⃣ استكمال التسجيل في الجامعة المخصصة\n\nالتقديم يفتح عادة في يوليو-أغسطس كل عام. تحقق من مواقع الجامعات للبرامج المباشرة.',
    ],
    followUpSuggestions: [
      'What documents do I need?',
      'What are the fees?',
      'Show me universities',
    ],
    priority: 85,
  },

  // ========================================
  // REQUIRED DOCUMENTS
  // ========================================
  {
    name: IntentName.REQUIRED_DOCUMENTS,
    displayName: 'Required Documents',
    patterns: [
      'documents', 'papers', 'what do i need', 'required documents', 'what papers',
      'مستندات', 'اوراق', 'ايه المطلوب', 'الاوراق المطلوبة',
    ],
    responses: [
      'Required documents:\n\n📄 Original certificate (Secondary or Diploma) + 5 digital copies\n📋 Final college nomination form (after coordination)\n👶 Original birth certificate + 5 copies\n🪖 Military status certificate (males - Form 2 and 6)\n📸 6 recent personal photos (4×6) with name\n🆔 3 copies of student\'s national ID\n🆔 3 copies of guardian\'s national ID\n💵 Tuition payment receipt\n📁 Black capsule plastic file folder',
    ],
    responsesAr: [
      'المستندات المطلوبة:\n\n📄 الشهادة الأصلية (ثانوية أو دبلوم) + 5 نسخ رقمية\n📋 استمارة الترشيح النهائية (بعد التنسيق)\n👶 شهادة الميلاد الأصلية + 5 نسخ\n🪖 شهادة الموقف العسكري (للذكور - نموذج 2 و 6)\n📸 6 صور شخصية حديثة (4×6) مع كتابة الاسم\n🆔 3 نسخ من بطاقة الطالب\n🆔 3 نسخ من بطاقة ولي الأمر\n💵 إيصال دفع المصاريف\n📁 ملف بلاستيك كبسولة أسود',
    ],
    priority: 75,
  },

  // ========================================
  // TUITION FEES
  // ========================================
  {
    name: IntentName.TUITION_FEES,
    displayName: 'Tuition Fees',
    patterns: [
      'fees', 'cost', 'how much', 'tuition', 'price', 'pay',
      'مصاريف', 'تكلفة', 'كام', 'سعر', 'الرسوم',
    ],
    responses: [
      'Tuition fees (per year):\n\n💰 Year 1 & 2: 11,000 - 16,000 EGP (varies by university)\n💰 Year 3 & 4: 16,000 - 22,000 EGP\n\nNCTU fees:\n• Year 1-2: 15,000 EGP/year\n• Year 3-4: 20,000 EGP/year\n\nNo fee increase announced for 2025-2026. Scholarships available for outstanding students!',
    ],
    responsesAr: [
      'الرسوم الدراسية (سنويًا):\n\n💰 السنة الأولى والثانية: 11,000 - 16,000 جنيه (تختلف حسب الجامعة)\n💰 السنة الثالثة والرابعة: 16,000 - 22,000 جنيه\n\nرسوم NCTU:\n• السنة 1-2: 15,000 جنيه/سنة\n• السنة 3-4: 20,000 جنيه/سنة\n\nلا توجد زيادة في الرسوم للعام 2025-2026. توجد منح للطلاب المتفوقين!',
    ],
    followUpSuggestions: [
      'Are there scholarships?',
      'How can I pay?',
      'Compare university fees',
    ],
    priority: 85,
  },

  // ========================================
  // SCHOLARSHIPS
  // ========================================
  {
    name: IntentName.SCHOLARSHIPS,
    displayName: 'Scholarships',
    patterns: [
      'scholarship', 'financial aid', 'discount', 'merit', 'free',
      'منحة', 'دعم مالي', 'خصم', 'تفوق', 'مجاني',
    ],
    responses: [
      'Available scholarships:\n\n🏆 Merit Scholarships: For students with outstanding academic performance. Requires maintaining high GPA.\n\n♿ Disability Scholarships: Dedicated support for students with special needs.\n\n🎓 Some universities offer additional scholarships for top performers in specific programs. Check with the university\'s admission office.',
    ],
    responsesAr: [
      'المنح المتاحة:\n\n🏆 منح التفوق: للطلاب المتفوقين أكاديميًا. تتطلب الحفاظ على معدل تراكمي مرتفع.\n\n♿ منح ذوي الاحتياجات الخاصة: دعم خاص للطلاب ذوي الإعاقة.\n\n🎓 بعض الجامعات تقدم منحًا إضافية للمتفوقين في برامج معينة. تواصل مع إدارة القبول بالجامعة.',
    ],
    priority: 75,
  },

  // ========================================
  // CONTACT INFO
  // ========================================
  {
    name: IntentName.CONTACT_INFO,
    displayName: 'Contact Information',
    patterns: [
      'contact', 'phone', 'email', 'how to contact', 'reach out',
      'تواصل', 'تليفون', 'ايميل', 'كيف اتواصل', 'اتصال',
    ],
    responses: [
      'You can contact NCTU through:\n\n📞 Mobile: +20 111 133 5725\n☎️ Landline: 02 25390250\n📧 Email: info@nctu.edu.eg\n🌐 Website: nctu.edu.eg\n📍 Location: New Cairo Technological University, New Cairo, Egypt\n\nSocial Media:\n• Facebook, LinkedIn, Twitter, TikTok, YouTube',
    ],
    responsesAr: [
      'يمكنك التواصل مع NCTU عبر:\n\n📞 موبايل: +20 111 133 5725\n☎️ تليفون أرضي: 02 25390250\n📧 إيميل: info@nctu.edu.eg\n🌐 الموقع: nctu.edu.eg\n📍 العنوان: جامعة القاهرة الجديدة التكنولوجية، القاهرة الجديدة\n\nوسائل التواصل:\n• فيسبوك، لينكد إن، تويتر، تيك توك، يوتيوب',
    ],
    priority: 80,
  },

  // ========================================
  // WORKING HOURS
  // ========================================
  {
    name: IntentName.WORKING_HOURS,
    displayName: 'Working Hours',
    patterns: [
      'hours', 'when open', 'working hours', 'office hours', 'open',
      'مواعيد', 'متى تفتح', 'ساعات العمل', 'مفتوح',
    ],
    responses: [
      '🕐 Working Hours:\n\nSunday - Thursday: 9:00 AM - 3:30 PM\nFriday - Saturday: Closed\n\n(Hours may vary slightly between universities. NCTU is open Saturday 9:00 - 3:30)',
    ],
    responsesAr: [
      '🕐 ساعات العمل:\n\nالأحد - الخميس: 9:00 صباحًا - 3:30 مساءً\nالجمعة - السبت: مغلق\n\n(قد تختلف الساعات قليلًا بين الجامعات. NCTU تفتح السبت من 9:00 - 3:30)',
    ],
    priority: 70,
  },

  // ========================================
  // HELP
  // ========================================
  {
    name: IntentName.HELP,
    displayName: 'Help',
    patterns: [
      'help', 'what can you do', 'commands', 'features', 'options',
      'مساعدة', 'ماذا تفعل', 'الأوامر', 'المميزات',
    ],
    responses: [
      'I can help you with:\n\n🏫 Universities - List, locations, info about each of the 14 technological universities\n\n📚 Programs - Available majors and specializations\n\n📝 Admission - Requirements, how to apply, documents needed\n\n💰 Fees - Tuition costs and scholarships\n\n💼 Careers - Job opportunities after graduation\n\n📞 Contact - Get in touch with universities\n\nJust ask me anything! Try: "What programs does NCTU offer?" or "How can I apply?"',
    ],
    responsesAr: [
      'يمكنني مساعدتك في:\n\n🏫 الجامعات - قائمة، مواقع، معلومات عن كل من الـ 14 جامعة تكنولوجية\n\n📚 البرامج - التخصصات المتاحة\n\n📝 القبول - الشروط، كيفية التقديم، المستندات المطلوبة\n\n💰 الرسوم - تكاليف الدراسة والمنح\n\n💼 الوظائف - فرص العمل بعد التخرج\n\n📞 التواصل - الاتصال بالجامعات\n\nاسألني عن أي شيء! جرب: "ما البرامج التي تقدمها NCTU؟" أو "كيف أقدم؟"',
    ],
    followUpSuggestions: [
      'List universities',
      'Show me programs',
      'Admission requirements',
    ],
    priority: 90,
  },
];

export async function seedIntents(dataSource: DataSource): Promise<void> {
  const intentRepo = dataSource.getRepository(ChatIntent);

  console.log('🗑️  Clearing existing intents...');
  await dataSource.query('TRUNCATE TABLE "chat_intents" CASCADE');

  console.log(`\n🌱 Seeding ${INTENTS_SEED.length} chatbot intents...\n`);

  for (let i = 0; i < INTENTS_SEED.length; i++) {
    const data = INTENTS_SEED[i];
    const intent = intentRepo.create({
      ...data,
      isActive: true,
    } as any);
    await intentRepo.save(intent);
    console.log(`${i + 1}/${INTENTS_SEED.length} ✅ ${data.displayName} (priority: ${data.priority || 0})`);
  }

  console.log('\n============================================');
  console.log(`🎉 Chatbot intents seeded!`);
  console.log(`   Total: ${INTENTS_SEED.length} intents`);
  console.log('============================================');
}
