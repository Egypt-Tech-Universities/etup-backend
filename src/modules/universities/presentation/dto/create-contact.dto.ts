import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString, MaxLength } from 'class-validator';
import { ContactType } from '../../domain/entities/contact.entity';

export class CreateContactDto {
  @ApiProperty({ enum: ContactType, example: ContactType.PHONE })
  @IsEnum(ContactType)
  type: ContactType;

  @ApiProperty({ example: '+201111335725' })
  @IsString()
  @MaxLength(500)
  value: string;

  @ApiPropertyOptional({ example: 'Main Office' })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  label?: string;
}
