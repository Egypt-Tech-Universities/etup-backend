import {
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../../users/domain/entities/user.entity';

@Entity('notification_preferences')
export class NotificationPreference {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index({ unique: true })
  @OneToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'user_id', unique: true })
  userId: string;

  // Enable/disable specific notification types
  @Column({ type: 'boolean', default: true, name: 'post_likes' })
  postLikes: boolean;

  @Column({ type: 'boolean', default: true, name: 'post_comments' })
  postComments: boolean;

  @Column({ type: 'boolean', default: true, name: 'comment_likes' })
  commentLikes: boolean;

  @Column({ type: 'boolean', default: true, name: 'comment_replies' })
  commentReplies: boolean;

  @Column({ type: 'boolean', default: true, name: 'mentions' })
  mentions: boolean;

  @Column({ type: 'boolean', default: true, name: 'news' })
  news: boolean;

  @Column({ type: 'boolean', default: true, name: 'system_announcements' })
  systemAnnouncements: boolean;

  // Channels
  @Column({ type: 'boolean', default: true, name: 'in_app' })
  inApp: boolean;

  @Column({ type: 'boolean', default: false, name: 'email' })
  email: boolean;

  @Column({ type: 'boolean', default: false, name: 'push' })
  push: boolean;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
