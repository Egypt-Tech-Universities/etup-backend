import { ConflictException, Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserRepository } from '../repositories/user.repository';
import { CreateUserDto } from '../dtos/create-user.dto';
import { User } from '../../domain/entities/user.entity';

@Injectable()
export class CreateUserUseCase {
  constructor(private readonly repo: UserRepository) {}

  async execute(dto: CreateUserDto): Promise<User> {
    const exists = await this.repo.existsByEmail(dto.email);
    if (exists) {
      throw new ConflictException(`Email ${dto.email} already exists`);
    }
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    return this.repo.create(dto, hashedPassword);
  }
}
