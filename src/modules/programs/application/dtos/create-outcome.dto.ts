import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, Min } from 'class-validator';

export class CreateOutcomeDto {
  @ApiProperty({ example: 'Design and implement modern web applications' })
  @IsString()
  outcome: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  outcomeAr?: string;

  @ApiPropertyOptional({ default: 0 })
  @IsOptional()
  @IsInt()
  @Min(0)
  displayOrder?: number;
}
