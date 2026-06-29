import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';

@Injectable()
export class GetUserByIdUseCase {
  constructor(private readonly repo: UserRepository) {}

  async execute(id: string) {
    const user = await this.repo.findById(id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }
}
