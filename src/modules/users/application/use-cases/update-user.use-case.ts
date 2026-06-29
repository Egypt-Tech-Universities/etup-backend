import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { UpdateUserDto } from '../dtos/update-user.dto';

@Injectable()
export class UpdateUserUseCase {
  constructor(private readonly repo: UserRepository) {}

  async execute(id: string, dto: UpdateUserDto) {
    const exists = await this.repo.findById(id);
    if (!exists) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return this.repo.update(id, dto);
  }
}
