import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdatePreferencesDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  postLikes?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  postComments?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  commentLikes?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  commentReplies?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  mentions?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  news?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  systemAnnouncements?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  inApp?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  email?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  push?: boolean;
}
