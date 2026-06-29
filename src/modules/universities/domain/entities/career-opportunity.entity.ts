import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Department } from './department.entity';

@Entity('career_opportunities')
export class CareerOpportunity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'varchar', length: 255, nullable: true, name: 'title_ar' })
  titleAr: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  icon: string;

  // ============== Relations ==============
  @ManyToOne(() => Department, (dept) => dept.careers, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'department_id' })
  department: Department;

  @Column({ name: 'department_id' })
  departmentId: string;
}
