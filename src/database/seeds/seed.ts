import { NestFactory } from '@nestjs/core';
import { AppModule } from '../../app.module';
import { DataSource } from 'typeorm';
import { University } from '../../modules/universities/domain/entities/university.entity';
import { UNIVERSITIES_SEED } from './universities.seed';
import { seedAdmin } from './admin.seed';
import { seedPrograms } from './programs.seed';
import { seedIntents } from './intents.seed';
import { seedSettings } from './settings.seed';
import { seedUniversitiesExtras } from './universities-extras.seed';

async function seed() {
  console.log('🚀 Starting full seeder...\n');

  const app = await NestFactory.createApplicationContext(AppModule);
  const dataSource = app.get(DataSource);

  try {
    // ============================================
    // 1) Seed Universities (only if empty)
    // ============================================
    const universityRepo = dataSource.getRepository(University);
    const existingCount = await universityRepo.count();

    if (existingCount === 0) {
      console.log('🗑️  Clearing existing data...\n');
      await dataSource.query('TRUNCATE TABLE "scholarships" CASCADE');
      await dataSource.query('TRUNCATE TABLE "tuition_fees" CASCADE');
      await dataSource.query('TRUNCATE TABLE "admission_requirements" CASCADE');
      await dataSource.query('TRUNCATE TABLE "university_images" CASCADE');
      await dataSource.query('TRUNCATE TABLE "working_hours" CASCADE');
      await dataSource.query('TRUNCATE TABLE "leadership" CASCADE');
      await dataSource.query('TRUNCATE TABLE "social_links" CASCADE');
      await dataSource.query('TRUNCATE TABLE "contacts" CASCADE');
      await dataSource.query('TRUNCATE TABLE "career_opportunities" CASCADE');
      await dataSource.query('TRUNCATE TABLE "specializations" CASCADE');
      await dataSource.query('TRUNCATE TABLE "departments" CASCADE');
      await dataSource.query('TRUNCATE TABLE "faculties" CASCADE');
      await dataSource.query('TRUNCATE TABLE "universities" CASCADE');

      console.log(`🌱 Seeding ${UNIVERSITIES_SEED.length} universities...\n`);

      for (let i = 0; i < UNIVERSITIES_SEED.length; i++) {
        const uniData = UNIVERSITIES_SEED[i];
        const university = universityRepo.create(uniData as any);
        const saved = await universityRepo.save(university);
        const result: any = Array.isArray(saved) ? saved[0] : saved;
        console.log(`${i + 1}/${UNIVERSITIES_SEED.length} ✅ ${uniData.name}`);
      }
      console.log('\n✅ Universities seeded\n');
    } else {
      console.log(`ℹ️  Universities already exist (${existingCount}). Skipping...\n`);
    }

    // ============================================
    // 2) Seed Admin
    // ============================================
    console.log('👤 Creating Admin User...\n');
    await seedAdmin(dataSource);

    // ============================================
    // 3) Seed Programs
    // ============================================
    console.log('📚 Seeding Programs...\n');
    await seedPrograms(dataSource);

    // ============================================
    // 4) Seed Chatbot Intents
    // ============================================
    console.log('🤖 Seeding Chatbot Intents...\n');
    await seedIntents(dataSource);

    // ============================================
    // 5) Seed Site Settings (Footer, Social, etc.)
    // ============================================
    console.log('⚙️  Seeding Site Settings...\n');
    await seedSettings(dataSource);

    // ============================================
    // 6) Seed University Extras (Timeline, Campus Moments)
    // ============================================
    console.log('🏛️  Seeding University Extras...\n');
    await seedUniversitiesExtras(dataSource);

    console.log('\n============================================');
    console.log('🎉 All seeders completed successfully!');
    console.log('============================================');
    console.log('');
    console.log('📋 Login Credentials:');
    console.log('   Email:    admin@nctu.edu.eg');
    console.log('   Password: Admin@123456');
    console.log('============================================');
  } catch (error) {
    console.error('❌ Seeding failed:');
    console.error(error);
    process.exit(1);
  } finally {
    await app.close();
    process.exit(0);
  }
}

seed();
