import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../../users/domain/entities/user.entity';
import { University } from '../../../universities/domain/entities/university.entity';
import { NewsCategory } from '../enums/news-category.enum';
import { NewsStatus } from '../enums/news-status.enum';

@Entity('news_articles')
export class NewsArticle {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // ============== Title & Slug ==============
  @Index()
  @Column({ type: 'varchar', length: 500 })
  title: string;

  @Column({ type: 'varchar', length: 500, nullable: true, name: 'title_ar' })
  titleAr: string;

  @Index({ unique: true })
  @Column({ type: 'varchar', length: 500 })
  slug: string;

  // ============== Content ==============
  @Column({ type: 'text' })
  summary: string;

  @Column({ type: 'text', nullable: true, name: 'summary_ar' })
  summaryAr: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'text', nullable: true, name: 'content_ar' })
  contentAr: string;

  // ============== Classification ==============
  @Index()
  @Column({
    type: 'enum',
    enum: NewsCategory,
    default: NewsCategory.GENERAL,
  })
  category: NewsCategory;

  @Column({ type: 'simple-array', nullable: true })
  tags: string[];

  // ============== Media ==============
  @Column({ type: 'varchar', length: 500, nullable: true, name: 'cover_image' })
  coverImage: string;

  @Column({ type: 'simple-array', nullable: true })
  gallery: string[]; // Additional images

  @Column({ type: 'varchar', length: 500, nullable: true, name: 'video_url' })
  videoUrl: string;

  // ============== Status & Visibility ==============
  @Index()
  @Column({
    type: 'enum',
    enum: NewsStatus,
    default: NewsStatus.DRAFT,
  })
  status: NewsStatus;

  @Column({ type: 'boolean', default: false, name: 'is_featured' })
  isFeatured: boolean;

  @Column({ type: 'boolean', default: false, name: 'is_pinned' })
  isPinned: boolean;

  // ============== Stats ==============
  @Column({ type: 'int', default: 0, name: 'views_count' })
  viewsCount: number;

  @Column({ type: 'int', default: 0, name: 'reading_minutes' })
  readingMinutes: number;

  // ============== SEO ==============
  @Column({ type: 'varchar', length: 500, nullable: true, name: 'meta_description' })
  metaDescription: string;

  @Column({ type: 'simple-array', nullable: true, name: 'meta_keywords' })
  metaKeywords: string[];

  // ============== Relations ==============
  @Index()
  @ManyToOne(() => User, { onDelete: 'SET NULL', nullable: true, eager: true })
  @JoinColumn({ name: 'author_id' })
  author: User | null;

  @Column({ name: 'author_id', nullable: true })
  authorId: string | null;

  @Index()
  @ManyToOne(() => University, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn({ name: 'university_id' })
  university: University | null;

  @Column({ name: 'university_id', nullable: true })
  universityId: string | null;

  // ============== Timestamps ==============
  @Column({ type: 'timestamp', nullable: true, name: 'published_at' })
  publishedAt: Date | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
