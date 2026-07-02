import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { University } from './university.entity';

@Entity('admission_timelines')
export class AdmissionTimeline {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'varchar', length: 255, nullable: true, name: 'title_ar' })
  titleAr: string;

  @Column({ type: 'text', nullable: true })
  detail: string;

  @Column({ type: 'text', nullable: true, name: 'detail_ar' })
  detailAr: string;

  @Column({ type: 'int', default: 0, name: 'display_order' })
  displayOrder: number;

  @ManyToOne(() => University, (uni) => uni.admissionTimelines, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'university_id' })
  university: University;

  @Column({ name: 'university_id' })
  universityId: string;
}
