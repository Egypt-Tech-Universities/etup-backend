import { UniversityImage } from '../../domain/entities/university-image.entity';
import { UniversityImageResponseDto } from '../../presentation/dto/university-image-response.dto';

export function toUniversityImageResponse(img: UniversityImage): UniversityImageResponseDto {
  return {
    id: img.id,
    imageUrl: img.imageUrl,
    caption: img.caption || '',
    displayOrder: img.displayOrder,
  };
}

export function toUniversityImageResponseList(imgs: UniversityImage[]): UniversityImageResponseDto[] {
  return imgs.map(toUniversityImageResponse);
}
