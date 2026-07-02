import { SocialLink } from '../../domain/entities/social-link.entity';
import { SocialLinkResponseDto } from '../../presentation/dto/social-link-response.dto';

export function toSocialLinkResponse(link: SocialLink): SocialLinkResponseDto {
  return {
    id: link.id,
    platform: link.platform,
    url: link.url,
  };
}

export function toSocialLinkResponseList(links: SocialLink[]): SocialLinkResponseDto[] {
  return links.map(toSocialLinkResponse);
}
