import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { University } from './university.entity';

export enum ContactType {
  PHONE = 'PHONE',
  EMAIL = 'EMAIL',
  ADDRESS = 'ADDRESS',
  FAX = 'FAX',
  WHATSAPP = 'WHATSAPP',
}

@Entity('contacts')
export class Contact {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: ContactType })
  type: ContactType;

  @Column({ type: 'varchar', length: 500 })
  value: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  label: string;

  // ============== Relations ==============
  @ManyToOne(() => University, (uni) => uni.contacts, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'university_id' })
  university: University;

  @Column({ name: 'university_id' })
  universityId: string;
}
