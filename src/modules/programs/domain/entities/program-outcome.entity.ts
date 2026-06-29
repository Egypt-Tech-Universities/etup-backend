import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Program } from './program.entity';

@Entity('program_outcomes')
export class ProgramOutcome {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  outcome: string;

  @Column({ type: 'text', nullable: true, name: 'outcome_ar' })
  outcomeAr: string;

  @Column({ type: 'int', default: 0, name: 'display_order' })
  displayOrder: number;

  @ManyToOne(() => Program, (p) => p.outcomes, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'program_id' })
  program: Program;

  @Column({ name: 'program_id' })
  programId: string;
}
