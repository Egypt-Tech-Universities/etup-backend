import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsInt, IsOptional, IsString, IsUUID, Min } from 'class-validator';
import { AdmissionType } from '../../domain/entities/admission-requirement.entity';

export class CreateAdmissionRequirementDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID('4')
  id?: string;

  @ApiProperty({ enum: AdmissionType })
  @IsEnum(AdmissionType)
  type: AdmissionType;

  @ApiProperty({ example: 'Must hold a recognized General Secondary Certificate' })
  @IsString()
  description: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  descriptionAr?: string;

  @ApiPropertyOptional({ default: 0 })
  @IsOptional()
  @IsInt()
  @Min(0)
  displayOrder?: number;
}
