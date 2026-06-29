import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateCareerOpportunityDto {
  @ApiProperty({ example: 'Software Developer' })
  @IsString()
  @MaxLength(255)
  title: string;

  @ApiPropertyOptional({ example: 'مطور برمجيات' })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  titleAr?: string;

  @ApiPropertyOptional({ example: '💻' })
  @IsOptional()
  @IsString()
  icon?: string;
}
