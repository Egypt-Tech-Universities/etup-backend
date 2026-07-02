import { Leadership } from '../../domain/entities/leadership.entity';
import { LeadershipResponseDto } from '../../presentation/dto/leadership-response.dto';

export function toLeadershipResponse(leader: Leadership): LeadershipResponseDto {
  return {
    id: leader.id,
    name: leader.name,
    nameAr: leader.nameAr || '',
    position: leader.position,
    positionAr: leader.positionAr || '',
    imageUrl: leader.imageUrl || '',
    displayOrder: leader.displayOrder,
  };
}

export function toLeadershipResponseList(leaders: Leadership[]): LeadershipResponseDto[] {
  return leaders.map(toLeadershipResponse);
}
