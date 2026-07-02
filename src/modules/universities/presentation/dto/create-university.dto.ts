import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  Max,
  MaxLength,
  Min,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { UniversityType } from '../../../../shared/enums/university-type.enum';
import { CreateFacultyDto } from './create-faculty.dto';
import { CreateContactDto } from './create-contact.dto';
import { CreateSocialLinkDto } from './create-social-link.dto';
import { CreateLeadershipDto } from './create-leadership.dto';
import { CreateWorkingHourDto } from './create-working-hour.dto';
import { CreateImageDto } from './create-image.dto';
import { CreateAdmissionRequirementDto } from './create-admission-requirement.dto';
import { CreateTuitionFeeDto } from './create-tuition-fee.dto';
import { CreateScholarshipDto } from './create-scholarship.dto';

export class CreateUniversityDto {
  // ============== Basic Info ==============
  @ApiProperty({ example: 'New Cairo Technological University' })
  @IsString()
  @MinLength(2)
  @MaxLength(255)
  name: string;

  @ApiPropertyOptional({ example: 'جامعة القاهرة الجديدة التكنولوجية' })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  nameAr?: string;

  @ApiPropertyOptional({ example: 'NCTU' })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  abbreviation?: string;

  @ApiProperty({ example: 'NCTU is a pioneering public institution...' })
  @IsString()
  @MinLength(10)
  description: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  descriptionAr?: string;

  // ============== Location ==============
  @ApiProperty({ example: 'Greater Cairo' })
  @IsString()
  region: string;

  @ApiProperty({ example: 'Cairo' })
  @IsString()
  governorate: string;

  @ApiProperty({ example: 'New Cairo' })
  @IsString()
  city: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  address?: string;

  @ApiPropertyOptional({ example: 30.0444 })
  @IsOptional()
  @IsNumber()
  latitude?: number;

  @ApiPropertyOptional({ example: 31.2357 })
  @IsOptional()
  @IsNumber()
  longitude?: number;

  // ============== Details ==============
  @ApiProperty({ example: 2022 })
  @IsInt()
  @Min(1000)
  @Max(2100)
  established: number;

  @ApiPropertyOptional({ enum: UniversityType, default: UniversityType.PUBLIC })
  @IsOptional()
  @IsEnum(UniversityType)
  type?: UniversityType;

  @ApiPropertyOptional({ example: 'https://nctu.edu.eg' })
  @IsOptional()
  @IsUrl({ require_tld: false })
  website?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUrl({ require_tld: false })
  logoUrl?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUrl({ require_tld: false })
  coverImageUrl?: string;

  // ============== Vision / Mission ==============
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  vision?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  visionAr?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  mission?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  missionAr?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  coreValues?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  coreValuesAr?: string;

  // ============== Tuition ==============
  @ApiPropertyOptional({ example: 15000 })
  @IsOptional()
  @IsInt()
  @Min(0)
  tuitionMin?: number;

  @ApiPropertyOptional({ example: 20000 })
  @IsOptional()
  @IsInt()
  @Min(0)
  tuitionMax?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUrl({ require_tld: false })
  applicationLink?: string;

  // ============== Nested Relations ==============
  @ApiPropertyOptional({ type: [CreateFacultyDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateFacultyDto)
  faculties?: CreateFacultyDto[];

  @ApiPropertyOptional({ type: [CreateContactDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateContactDto)
  contacts?: CreateContactDto[];

  @ApiPropertyOptional({ type: [CreateSocialLinkDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateSocialLinkDto)
  socialLinks?: CreateSocialLinkDto[];

  @ApiPropertyOptional({ type: [CreateLeadershipDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateLeadershipDto)
  leadership?: CreateLeadershipDto[];

  @ApiPropertyOptional({ type: [CreateWorkingHourDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateWorkingHourDto)
  workingHours?: CreateWorkingHourDto[];

  @ApiPropertyOptional({ type: [CreateImageDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateImageDto)
  images?: CreateImageDto[];

  @ApiPropertyOptional({ type: [CreateAdmissionRequirementDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateAdmissionRequirementDto)
  admissionRequirements?: CreateAdmissionRequirementDto[];

  @ApiPropertyOptional({ type: [CreateTuitionFeeDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateTuitionFeeDto)
  tuitionFees?: CreateTuitionFeeDto[];

  @ApiPropertyOptional({ type: [CreateScholarshipDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateScholarshipDto)
  scholarships?: CreateScholarshipDto[];
}
