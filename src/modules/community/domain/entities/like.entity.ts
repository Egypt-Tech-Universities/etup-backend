import {
  Check,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { User } from '../../../users/domain/entities/user.entity';
import { Post } from './post.entity';
import { Comment } from './comment.entity';

@Entity('likes')
@Unique('UQ_user_post', ['userId', 'postId'])
@Unique('UQ_user_comment', ['userId', 'commentId'])
@Check('CHK_like_target', '("post_id" IS NOT NULL) OR ("comment_id" IS NOT NULL)')
export class Like {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // User who liked
  @Index()
  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'user_id' })
  userId: string;

  // Like on Post
  @ManyToOne(() => Post, (p) => p.likes, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({ name: 'post_id' })
  post: Post | null;

  @Column({ name: 'post_id', nullable: true })
  postId: string | null;

  // OR Like on Comment
  @ManyToOne(() => Comment, (c) => c.likes, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({ name: 'comment_id' })
  comment: Comment | null;

  @Column({ name: 'comment_id', nullable: true })
  commentId: string | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
