import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, IsUUID, IsUrl, Min } from 'class-validator';

export class CreateImageDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID('4')
  id?: string;

  @ApiProperty({ example: 'https://example.com/image.jpg' })
  @IsUrl({ require_tld: false })
  imageUrl: string;

  @ApiPropertyOptional({ example: 'University Main Building' })
  @IsOptional()
  @IsString()
  caption?: string;

  @ApiPropertyOptional({ default: 0 })
  @IsOptional()
  @IsInt()
  @Min(0)
  displayOrder?: number;
}
