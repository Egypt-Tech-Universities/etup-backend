import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { University } from './university.entity';

@Entity('scholarships')
export class Scholarship {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255, nullable: true, name: 'name_ar' })
  nameAr: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'text', nullable: true, name: 'description_ar' })
  descriptionAr: string;

  @Column({ type: 'text', nullable: true })
  criteria: string;

  // ============== Relations ==============
  @ManyToOne(() => University, (uni) => uni.scholarships, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'university_id' })
  university: University;

  @Column({ name: 'university_id' })
  universityId: string;
}
