import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  ArrayMaxSize,
  IsArray,
  IsBoolean,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  IsUrl,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { NewsCategory } from '../../domain/enums/news-category.enum';
import { NewsStatus } from '../../domain/enums/news-status.enum';

export class CreateNewsDto {
  @ApiProperty({ example: 'NCTU Launches New AI Program' })
  @IsString()
  @MinLength(5)
  @MaxLength(500)
  title: string;

  @ApiPropertyOptional({ example: 'NCTU تطلق برنامج ذكاء اصطناعي جديد' })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  titleAr?: string;

  @ApiPropertyOptional({
    example: 'nctu-launches-new-ai-program',
    description: 'URL-friendly slug. Auto-generated if not provided.',
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  slug?: string;

  @ApiProperty({ example: 'NCTU is proud to announce a new AI program...' })
  @IsString()
  @MinLength(20)
  summary: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  summaryAr?: string;

  @ApiProperty({ example: 'Full article content here...' })
  @IsString()
  @MinLength(50)
  content: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  contentAr?: string;

  @ApiProperty({ enum: NewsCategory, example: NewsCategory.ACADEMIC })
  @IsEnum(NewsCategory)
  category: NewsCategory;

  @ApiPropertyOptional({ type: [String], example: ['AI', 'technology', 'new-program'] })
  @IsOptional()
  @IsArray()
  @ArrayMaxSize(15)
  @IsString({ each: true })
  tags?: string[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsUrl()
  coverImage?: string;

  @ApiPropertyOptional({ type: [String] })
  @IsOptional()
  @IsArray()
  @ArrayMaxSize(10)
  @IsUrl({}, { each: true })
  gallery?: string[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsUrl()
  videoUrl?: string;

  @ApiPropertyOptional({ enum: NewsStatus, default: NewsStatus.DRAFT })
  @IsOptional()
  @IsEnum(NewsStatus)
  status?: NewsStatus;

  @ApiPropertyOptional({ default: false })
  @IsOptional()
  @IsBoolean()
  isFeatured?: boolean;

  @ApiPropertyOptional({ default: false })
  @IsOptional()
  @IsBoolean()
  isPinned?: boolean;

  @ApiPropertyOptional({ example: 5, description: 'Estimated reading time in minutes' })
  @IsOptional()
  @IsInt()
  @Min(1)
  readingMinutes?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(500)
  metaDescription?: string;

  @ApiPropertyOptional({ type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  metaKeywords?: string[];

  @ApiPropertyOptional({ description: 'Optional university ID' })
  @IsOptional()
  @IsUUID('4')
  universityId?: string;
}
