import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { IntentName } from '../../domain/enums/intent-name.enum';

export class CreateIntentDto {
  @ApiProperty({ enum: IntentName })
  @IsEnum(IntentName)
  name: IntentName;

  @ApiProperty({ example: 'Greeting' })
  @IsString()
  displayName: string;

  @ApiProperty({ type: [String], example: ['hello', 'hi', 'hey'] })
  @IsArray()
  @IsString({ each: true })
  patterns: string[];

  @ApiProperty({ type: [String] })
  @IsArray()
  @IsString({ each: true })
  responses: string[];

  @ApiPropertyOptional({ type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  responsesAr?: string[];

  @ApiPropertyOptional({ type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  followUpSuggestions?: string[];

  @ApiPropertyOptional({ default: false })
  @IsOptional()
  @IsBoolean()
  requiresData?: boolean;

  @ApiPropertyOptional({ description: 'e.g. universities, programs' })
  @IsOptional()
  @IsString()
  dataSource?: string;

  @ApiPropertyOptional({ default: 0 })
  @IsOptional()
  @IsInt()
  @Min(0)
  priority?: number;

  @ApiPropertyOptional({ default: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
