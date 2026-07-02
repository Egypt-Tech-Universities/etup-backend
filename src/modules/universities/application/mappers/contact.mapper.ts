import { Contact } from '../../domain/entities/contact.entity';
import { ContactResponseDto } from '../../presentation/dto/contact-response.dto';

export function toContactResponse(contact: Contact): ContactResponseDto {
  return {
    id: contact.id,
    type: contact.type,
    value: contact.value,
    label: contact.label || '',
  };
}

export function toContactResponseList(contacts: Contact[]): ContactResponseDto[] {
  return contacts.map(toContactResponse);
}
