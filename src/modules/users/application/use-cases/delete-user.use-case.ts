import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';

@Injectable()
export class DeleteUserUseCase {
  constructor(private readonly repo: UserRepository) {}

  async execute(id: string): Promise<void> {
    const exists = await this.repo.findById(id);
    if (!exists) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    await this.repo.delete(id);
  }
}
