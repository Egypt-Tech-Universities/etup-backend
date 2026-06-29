import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DayOfWeek } from '../../../../shared/enums/day-of-week.enum';
import { University } from './university.entity';

@Entity('working_hours')
export class WorkingHour {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: DayOfWeek })
  day: DayOfWeek;

  @Column({ type: 'varchar', length: 10, nullable: true, name: 'open_time' })
  openTime: string; // مثال: "09:00"

  @Column({ type: 'varchar', length: 10, nullable: true, name: 'close_time' })
  closeTime: string; // مثال: "15:30"

  @Column({ type: 'boolean', default: false, name: 'is_closed' })
  isClosed: boolean;

  // ============== Relations ==============
  @ManyToOne(() => University, (uni) => uni.workingHours, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'university_id' })
  university: University;

  @Column({ name: 'university_id' })
  universityId: string;
}
