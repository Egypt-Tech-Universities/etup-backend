import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { PaginationDto } from '../../../../shared/dto/pagination.dto';
import { UniversityType } from '../../../../shared/enums/university-type.enum';

export class ListUniversitiesDto extends PaginationDto {
  @ApiPropertyOptional({ description: 'Search by name', example: 'Cairo' })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  region?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  governorate?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  city?: string;

  @ApiPropertyOptional({ enum: UniversityType })
  @IsOptional()
  @IsEnum(UniversityType)
  type?: UniversityType;
}
