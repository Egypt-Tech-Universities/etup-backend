import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../../users/domain/entities/user.entity';
import { University } from '../../../universities/domain/entities/university.entity';
import { PostCategory } from '../enums/post-category.enum';
import { Comment } from './comment.entity';
import { Like } from './like.entity';

@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'text' })
  content: string;

  @Index()
  @Column({ type: 'enum', enum: PostCategory, default: PostCategory.GENERAL })
  category: PostCategory;

  // Optional tags
  @Column({ type: 'simple-array', nullable: true })
  tags: string[];

  // Optional image URLs (array stored as JSON)
  @Column({ type: 'simple-array', nullable: true, name: 'image_urls' })
  imageUrls: string[];

  // Counters (denormalized for performance)
  @Column({ type: 'int', default: 0, name: 'likes_count' })
  likesCount: number;

  @Column({ type: 'int', default: 0, name: 'comments_count' })
  commentsCount: number;

  @Column({ type: 'int', default: 0, name: 'views_count' })
  viewsCount: number;

  // Status
  @Column({ type: 'boolean', default: false, name: 'is_pinned' })
  isPinned: boolean;

  @Column({ type: 'boolean', default: false, name: 'is_locked' })
  isLocked: boolean;

  @Column({ type: 'boolean', default: false, name: 'is_hidden' })
  isHidden: boolean;

  // Relations
  @Index()
  @ManyToOne(() => User, { onDelete: 'CASCADE', eager: true })
  @JoinColumn({ name: 'author_id' })
  author: User;

  @Column({ name: 'author_id' })
  authorId: string;

  @ManyToOne(() => University, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn({ name: 'university_id' })
  university: University | null;

  @Column({ name: 'university_id', nullable: true })
  universityId: string | null;

  @OneToMany(() => Comment, (c) => c.post, { cascade: true })
  comments: Comment[];

  @OneToMany(() => Like, (l) => l.post)
  likes: Like[];

  // Timestamps
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
