import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Department } from './department.entity';

@Entity('specializations')
export class Specialization {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255, nullable: true, name: 'name_ar' })
  nameAr: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  icon: string; // emoji أو اسم الأيقونة

  @Column({ type: 'text', nullable: true })
  description: string;

  // ============== Relations ==============
  @ManyToOne(() => Department, (dept) => dept.specializations, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'department_id' })
  department: Department;

  @Column({ name: 'department_id' })
  departmentId: string;
}
