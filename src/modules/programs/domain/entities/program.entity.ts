import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProgramCategory } from '../enums/program-category.enum';
import { DegreeLevel } from '../enums/degree-level.enum';
import { ProgramLanguage } from '../enums/program-language.enum';
import { University } from '../../../universities/domain/entities/university.entity';
import { ProgramHighlight } from './program-highlight.entity';
import { ProgramOutcome } from './program-outcome.entity';

@Entity('programs')
export class Program {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // ============== Basic Info ==============
  @Index()
  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255, nullable: true, name: 'name_ar' })
  nameAr: string;

  @Index({ unique: true })
  @Column({ type: 'varchar', length: 255 })
  slug: string; // URL-friendly: information-technology

  @Column({ type: 'varchar', length: 50, nullable: true })
  icon: string; // emoji

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'text', nullable: true, name: 'description_ar' })
  descriptionAr: string;

  // ============== Classification ==============
  @Index()
  @Column({ type: 'enum', enum: ProgramCategory })
  category: ProgramCategory;

  @Column({ type: 'enum', enum: DegreeLevel })
  degreeLevel: DegreeLevel;

  @Column({ type: 'enum', enum: ProgramLanguage, default: ProgramLanguage.ARABIC })
  language: ProgramLanguage;

  // ============== Duration ==============
  @Column({ type: 'int', name: 'duration_years' })
  durationYears: number; // 2, 4, 5

  @Column({ type: 'int', nullable: true, name: 'total_credits' })
  totalCredits: number;

  // ============== Media ==============
  @Column({ type: 'varchar', length: 500, nullable: true, name: 'logo_url' })
  logoUrl: string;

  @Column({ type: 'varchar', length: 500, nullable: true, name: 'cover_image_url' })
  coverImageUrl: string;

  // ============== Career & Stats ==============
  @Column({ type: 'text', nullable: true, name: 'career_paths' })
  careerPaths: string; // مسارات وظيفية مختصرة

  @Column({ type: 'int', nullable: true, name: 'avg_salary_min' })
  avgSalaryMin: number; // EGP

  @Column({ type: 'int', nullable: true, name: 'avg_salary_max' })
  avgSalaryMax: number; // EGP

  // ============== Status ==============
  @Column({ type: 'boolean', default: true, name: 'is_active' })
  isActive: boolean;

  @Column({ type: 'boolean', default: false, name: 'is_featured' })
  isFeatured: boolean;

  // ============== Timestamps ==============
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  // ============== Relations ==============
  @ManyToMany(() => University, { cascade: false })
  @JoinTable({
    name: 'university_programs',
    joinColumn: { name: 'program_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'university_id', referencedColumnName: 'id' },
  })
  universities: University[];

  @OneToMany(() => ProgramHighlight, (h) => h.program, { cascade: true })
  highlights: ProgramHighlight[];

  @OneToMany(() => ProgramOutcome, (o) => o.program, { cascade: true })
  outcomes: ProgramOutcome[];
}
