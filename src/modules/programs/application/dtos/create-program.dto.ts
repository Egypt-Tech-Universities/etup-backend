import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  IsUrl,
  IsUUID,
  MaxLength,
  Min,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { ProgramCategory } from '../../domain/enums/program-category.enum';
import { DegreeLevel } from '../../domain/enums/degree-level.enum';
import { ProgramLanguage } from '../../domain/enums/program-language.enum';
import { CreateHighlightDto } from './create-highlight.dto';
import { CreateOutcomeDto } from './create-outcome.dto';

export class CreateProgramDto {
  @ApiProperty({ example: 'Information Technology' })
  @IsString()
  @MinLength(2)
  @MaxLength(255)
  name: string;

  @ApiPropertyOptional({ example: 'تكنولوجيا المعلومات' })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  nameAr?: string;

  @ApiProperty({ example: 'information-technology' })
  @IsString()
  @MaxLength(255)
  slug: string;

  @ApiPropertyOptional({ example: '💻' })
  @IsOptional()
  @IsString()
  icon?: string;

  @ApiProperty({ example: 'Comprehensive IT program covering networks, cybersecurity, and software development.' })
  @IsString()
  @MinLength(10)
  description: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  descriptionAr?: string;

  @ApiProperty({ enum: ProgramCategory, example: ProgramCategory.IT })
  @IsEnum(ProgramCategory)
  category: ProgramCategory;

  @ApiProperty({ enum: DegreeLevel, example: DegreeLevel.BACHELOR })
  @IsEnum(DegreeLevel)
  degreeLevel: DegreeLevel;

  @ApiPropertyOptional({ enum: ProgramLanguage, default: ProgramLanguage.ARABIC })
  @IsOptional()
  @IsEnum(ProgramLanguage)
  language?: ProgramLanguage;

  @ApiProperty({ example: 4 })
  @IsInt()
  @Min(1)
  durationYears: number;

  @ApiPropertyOptional({ example: 144 })
  @IsOptional()
  @IsInt()
  @Min(0)
  totalCredits?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUrl()
  logoUrl?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUrl()
  coverImageUrl?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  careerPaths?: string;

  @ApiPropertyOptional({ example: 8000 })
  @IsOptional()
  @IsInt()
  @Min(0)
  avgSalaryMin?: number;

  @ApiPropertyOptional({ example: 25000 })
  @IsOptional()
  @IsInt()
  @Min(0)
  avgSalaryMax?: number;

  @ApiPropertyOptional({ default: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiPropertyOptional({ default: false })
  @IsOptional()
  @IsBoolean()
  isFeatured?: boolean;

  // ============== Nested ==============
  @ApiPropertyOptional({
    type: [String],
    description: 'University IDs to associate with this program',
    example: ['uuid-1', 'uuid-2'],
  })
  @IsOptional()
  @IsArray()
  @IsUUID('4', { each: true })
  universityIds?: string[];

  @ApiPropertyOptional({ type: [CreateHighlightDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateHighlightDto)
  highlights?: CreateHighlightDto[];

  @ApiPropertyOptional({ type: [CreateOutcomeDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateOutcomeDto)
  outcomes?: CreateOutcomeDto[];
}
