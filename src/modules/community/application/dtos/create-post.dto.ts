import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  ArrayMaxSize,
  IsArray,
  IsEnum,
  IsOptional,
  IsString,
  IsUUID,
  IsUrl,
  MaxLength,
  MinLength,
} from 'class-validator';
import { PostCategory } from '../../domain/enums/post-category.enum';

export class CreatePostDto {
  @ApiProperty({ example: 'How to prepare for the NCTU admission test?' })
  @IsString()
  @MinLength(3)
  @MaxLength(255)
  title: string;

  @ApiProperty({ example: 'I want to know what topics to focus on...' })
  @IsString()
  @MinLength(10)
  content: string;

  @ApiPropertyOptional({ enum: PostCategory, default: PostCategory.GENERAL })
  @IsOptional()
  @IsEnum(PostCategory)
  category?: PostCategory;

  @ApiPropertyOptional({ type: [String], example: ['admission', 'tips'] })
  @IsOptional()
  @IsArray()
  @ArrayMaxSize(10)
  @IsString({ each: true })
  tags?: string[];

  @ApiPropertyOptional({ type: [String], example: ['https://example.com/img.jpg'] })
  @IsOptional()
  @IsArray()
  @ArrayMaxSize(5)
  @IsUrl({}, { each: true })
  imageUrls?: string[];

  @ApiPropertyOptional({ description: 'Optional university association' })
  @IsOptional()
  @IsUUID('4')
  universityId?: string;
}
