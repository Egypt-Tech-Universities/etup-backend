import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Faculty } from './faculty.entity';
import { Specialization } from './specialization.entity';
import { CareerOpportunity } from './career-opportunity.entity';

@Entity('departments')
export class Department {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255, nullable: true, name: 'name_ar' })
  nameAr: string;

  @Column({ type: 'text', nullable: true })
  overview: string;

  @Column({ type: 'text', nullable: true, name: 'overview_ar' })
  overviewAr: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  coordinator: string;

  // ============== Relations ==============
  @ManyToOne(() => Faculty, (faculty) => faculty.departments, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'faculty_id' })
  faculty: Faculty;

  @Column({ name: 'faculty_id' })
  facultyId: string;

  @OneToMany(() => Specialization, (spec) => spec.department, { cascade: true })
  specializations: Specialization[];

  @OneToMany(() => CareerOpportunity, (career) => career.department, {
    cascade: true,
  })
  careers: CareerOpportunity[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
