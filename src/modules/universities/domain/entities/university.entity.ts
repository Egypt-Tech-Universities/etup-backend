import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UniversityType } from '../../../../shared/enums/university-type.enum';
import { Faculty } from './faculty.entity';
import { Contact } from './contact.entity';
import { SocialLink } from './social-link.entity';
import { Leadership } from './leadership.entity';
import { WorkingHour } from './working-hour.entity';
import { UniversityImage } from './university-image.entity';
import { AdmissionRequirement } from './admission-requirement.entity';
import { TuitionFee } from './tuition-fee.entity';
import { Scholarship } from './scholarship.entity';

@Entity('universities')
export class University {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // ============== Basic Info ==============
  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255, nullable: true, name: 'name_ar' })
  nameAr: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  abbreviation: string; // مثال: NCTU

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'text', nullable: true, name: 'description_ar' })
  descriptionAr: string;

  // ============== Location ==============
  @Column({ type: 'varchar', length: 100 })
  region: string;

  @Column({ type: 'varchar', length: 100 })
  governorate: string;

  @Column({ type: 'varchar', length: 100 })
  city: string;

  @Column({ type: 'text', nullable: true })
  address: string;

  @Column({ type: 'decimal', precision: 10, scale: 7, nullable: true })
  latitude: number;

  @Column({ type: 'decimal', precision: 10, scale: 7, nullable: true })
  longitude: number;

  // ============== Details ==============
  @Column({ type: 'int' })
  established: number;

  @Column({
    type: 'enum',
    enum: UniversityType,
    default: UniversityType.PUBLIC,
  })
  type: UniversityType;

  @Column({ type: 'varchar', length: 500, nullable: true })
  website: string;

  @Column({ type: 'varchar', length: 500, nullable: true, name: 'logo_url' })
  logoUrl: string;

  @Column({ type: 'varchar', length: 500, nullable: true, name: 'cover_image_url' })
  coverImageUrl: string;

  // ============== Vision / Mission / Values ==============
  @Column({ type: 'text', nullable: true })
  vision: string;

  @Column({ type: 'text', nullable: true })
  mission: string;

  @Column({ type: 'text', nullable: true, name: 'core_values' })
  coreValues: string;

  // ============== Tuition Range (quick filter) ==============
  @Column({ type: 'int', nullable: true, name: 'tuition_min' })
  tuitionMin: number;

  @Column({ type: 'int', nullable: true, name: 'tuition_max' })
  tuitionMax: number;

  // ============== Application Link ==============
  @Column({ type: 'varchar', length: 500, nullable: true, name: 'application_link' })
  applicationLink: string;

  // ============== Status ==============
  @Column({ type: 'boolean', default: true, name: 'is_active' })
  isActive: boolean;

  // ============== Timestamps ==============
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  // ============== Relations ==============
  @OneToMany(() => Faculty, (faculty) => faculty.university, {
    cascade: true,
  })
  faculties: Faculty[];

  @OneToMany(() => Contact, (contact) => contact.university, { cascade: true })
  contacts: Contact[];

  @OneToMany(() => SocialLink, (link) => link.university, { cascade: true })
  socialLinks: SocialLink[];

  @OneToMany(() => Leadership, (leader) => leader.university, { cascade: true })
  leadership: Leadership[];

  @OneToMany(() => WorkingHour, (wh) => wh.university, { cascade: true })
  workingHours: WorkingHour[];

  @OneToMany(() => UniversityImage, (img) => img.university, { cascade: true })
  images: UniversityImage[];

  @OneToMany(() => AdmissionRequirement, (req) => req.university, {
    cascade: true,
  })
  admissionRequirements: AdmissionRequirement[];

  @OneToMany(() => TuitionFee, (fee) => fee.university, { cascade: true })
  tuitionFees: TuitionFee[];

  @OneToMany(() => Scholarship, (sch) => sch.university, { cascade: true })
  scholarships: Scholarship[];
}
