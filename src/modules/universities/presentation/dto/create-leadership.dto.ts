import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsInt,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateLeadershipDto {
  @ApiProperty({ example: 'Prof. Dr. Tarek Abdel Malek' })
  @IsString()
  @MaxLength(255)
  name: string;

  @ApiPropertyOptional({ example: 'أ.د. طارق عبد الملك' })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  nameAr?: string;

  @ApiProperty({ example: 'President of NCTU' })
  @IsString()
  @MaxLength(255)
  position: string;

  @ApiPropertyOptional({ example: 'رئيس الجامعة' })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  positionAr?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUrl()
  imageUrl?: string;

  @ApiPropertyOptional({ default: 0 })
  @IsOptional()
  @IsInt()
  @Min(0)
  displayOrder?: number;
}
