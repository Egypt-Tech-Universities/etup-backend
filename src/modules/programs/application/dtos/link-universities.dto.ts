import { ApiProperty } from '@nestjs/swagger';
import { ArrayMinSize, IsArray, IsUUID } from 'class-validator';

export class LinkUniversitiesDto {
  @ApiProperty({
    type: [String],
    description: 'University IDs to link to this program',
    example: ['uuid-1', 'uuid-2'],
  })
  @IsArray()
  @ArrayMinSize(1)
  @IsUUID('4', { each: true })
  universityIds: string[];
}
