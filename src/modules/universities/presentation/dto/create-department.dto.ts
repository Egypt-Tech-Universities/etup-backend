import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { CreateSpecializationDto } from './create-specialization.dto';
import { CreateCareerOpportunityDto } from './create-career-opportunity.dto';

export class CreateDepartmentDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID('4')
  id?: string;

  @ApiProperty({ example: 'Information Technology' })
  @IsString()
  @MaxLength(255)
  name: string;

  @ApiPropertyOptional({ example: 'تكنولوجيا المعلومات' })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  nameAr?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  overview?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  overviewAr?: string;

  @ApiPropertyOptional({ example: 'Dr. Osama Tharwat' })
  @IsOptional()
  @IsString()
  coordinator?: string;

  @ApiPropertyOptional({ type: [CreateSpecializationDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateSpecializationDto)
  specializations?: CreateSpecializationDto[];

  @ApiPropertyOptional({ type: [CreateCareerOpportunityDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateCareerOpportunityDto)
  careers?: CreateCareerOpportunityDto[];
}
