import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IntentName } from '../enums/intent-name.enum';

@Entity('chat_intents')
export class ChatIntent {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index({ unique: true })
  @Column({ type: 'enum', enum: IntentName })
  name: IntentName;

  @Column({ type: 'varchar', length: 255 })
  displayName: string;

  // Patterns to match (keywords/phrases)
  @Column({ type: 'simple-array' })
  patterns: string[];

  // Multiple possible responses (random selection)
  @Column({ type: 'simple-array' })
  responses: string[];

  @Column({ type: 'simple-array', nullable: true, name: 'responses_ar' })
  responsesAr: string[];

  // Suggested follow-up questions
  @Column({ type: 'simple-array', nullable: true, name: 'follow_up_suggestions' })
  followUpSuggestions: string[];

  // If true, will fetch data from DB (universities, programs, etc.)
  @Column({ type: 'boolean', default: false, name: 'requires_data' })
  requiresData: boolean;

  @Column({ type: 'varchar', length: 50, nullable: true, name: 'data_source' })
  dataSource: string | null; // e.g. 'universities', 'programs'

  @Column({ type: 'int', default: 0 })
  priority: number; // Higher = checked first

  @Column({ type: 'boolean', default: true, name: 'is_active' })
  isActive: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
