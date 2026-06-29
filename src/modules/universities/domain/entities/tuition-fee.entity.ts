import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { University } from './university.entity';

@Entity('tuition_fees')
export class TuitionFee {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100, name: 'year_range' })
  yearRange: string; // مثال: "Year 1 & 2"

  @Column({ type: 'int' })
  amount: number;

  @Column({ type: 'varchar', length: 10, default: 'EGP' })
  currency: string;

  @Column({ type: 'varchar', length: 255, nullable: true, name: 'academic_year' })
  academicYear: string; // مثال: "2025-2026"

  @Column({ type: 'text', nullable: true })
  notes: string;

  // ============== Relations ==============
  @ManyToOne(() => University, (uni) => uni.tuitionFees, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'university_id' })
  university: University;

  @Column({ name: 'university_id' })
  universityId: string;
}
