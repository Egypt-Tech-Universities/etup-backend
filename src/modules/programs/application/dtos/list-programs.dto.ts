import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';
import { Transform } from 'class-transformer';
import { PaginationDto } from '../../../../shared/dto/pagination.dto';
import { ProgramCategory } from '../../domain/enums/program-category.enum';
import { DegreeLevel } from '../../domain/enums/degree-level.enum';
import { ProgramLanguage } from '../../domain/enums/program-language.enum';

export class ListProgramsDto extends PaginationDto {
  @ApiPropertyOptional({ example: 'IT' })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({ enum: ProgramCategory })
  @IsOptional()
  @IsEnum(ProgramCategory)
  category?: ProgramCategory;

  @ApiPropertyOptional({ enum: DegreeLevel })
  @IsOptional()
  @IsEnum(DegreeLevel)
  degreeLevel?: DegreeLevel;

  @ApiPropertyOptional({ enum: ProgramLanguage })
  @IsOptional()
  @IsEnum(ProgramLanguage)
  language?: ProgramLanguage;

  @ApiPropertyOptional({ description: 'Filter programs by university ID' })
  @IsOptional()
  @IsUUID('4')
  universityId?: string;

  @ApiPropertyOptional({ description: 'Show only featured programs' })
  @IsOptional()
  @Transform(({ value }) => value === 'true' || value === true)
  @IsBoolean()
  isFeatured?: boolean;
}
