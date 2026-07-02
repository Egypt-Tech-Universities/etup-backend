import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsUrl, IsUUID } from 'class-validator';
import { SocialPlatform } from '../../domain/entities/social-link.entity';

export class CreateSocialLinkDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID('4')
  id?: string;

  @ApiProperty({ enum: SocialPlatform, example: SocialPlatform.FACEBOOK })
  @IsEnum(SocialPlatform)
  platform: SocialPlatform;

  @ApiProperty({ example: 'https://facebook.com/nctu' })
  @IsUrl({ require_tld: false })
  url: string;
}
