import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { University } from './university.entity';

export enum AdmissionType {
  GENERAL_SECONDARY = 'GENERAL_SECONDARY',
  TECHNICAL_DIPLOMA = 'TECHNICAL_DIPLOMA',
  INTERNATIONAL = 'INTERNATIONAL',
}

@Entity('admission_requirements')
export class AdmissionRequirement {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: AdmissionType })
  type: AdmissionType;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'text', nullable: true, name: 'description_ar' })
  descriptionAr: string;

  @Column({ type: 'int', default: 0, name: 'display_order' })
  displayOrder: number;

  // ============== Relations ==============
  @ManyToOne(() => University, (uni) => uni.admissionRequirements, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'university_id' })
  university: University;

  @Column({ name: 'university_id' })
  universityId: string;
}
