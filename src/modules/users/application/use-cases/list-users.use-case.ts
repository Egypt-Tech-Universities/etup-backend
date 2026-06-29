import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { PaginationDto } from '../../../../shared/dto/pagination.dto';

@Injectable()
export class ListUsersUseCase {
  constructor(private readonly repo: UserRepository) {}

  async execute(query: PaginationDto) {
    const page = query.page ?? 1;
    const limit = query.limit ?? 10;
    return this.repo.findAll(page, limit);
  }
}
