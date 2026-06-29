import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthProvider, User } from '../../domain/entities/user.entity';
import {
  CreateGoogleUserData,
  UserRepository,
} from '../../application/repositories/user.repository';
import { CreateUserDto } from '../../application/dtos/create-user.dto';
import { UpdateUserDto } from '../../application/dtos/update-user.dto';
import { getSkip } from '../../../../shared/utils/pagination.util';

@Injectable()
export class TypeOrmUserRepository extends UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly repo: Repository<User>,
  ) {
    super();
  }

  async create(dto: CreateUserDto, hashedPassword: string): Promise<User> {
    const user = this.repo.create({
      ...dto,
      password: hashedPassword,
      authProvider: AuthProvider.LOCAL,
    });
    return this.repo.save(user) as Promise<User>;
  }

  async createGoogleUser(data: CreateGoogleUserData): Promise<User> {
    const user = this.repo.create({
      email: data.email,
      name: data.name,
      googleId: data.googleId,
      avatarUrl: data.avatarUrl,
      authProvider: AuthProvider.GOOGLE,
      isEmailVerified: true, // Google already verified the email
      password: null,
    });
    return this.repo.save(user) as Promise<User>;
  }

  async findById(id: string): Promise<User | null> {
    return this.repo.findOne({ where: { id } });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.repo.findOne({ where: { email } });
  }

  async findByGoogleId(googleId: string): Promise<User | null> {
    return this.repo.findOne({ where: { googleId } });
  }

  async linkGoogleAccount(
    userId: string,
    googleId: string,
    avatarUrl?: string,
  ): Promise<User> {
    await this.repo.update(userId, {
      googleId,
      avatarUrl: avatarUrl || undefined,
      isEmailVerified: true,
    });
    return (await this.findById(userId))!;
  }

  async update(id: string, dto: UpdateUserDto): Promise<User> {
    await this.repo.update(id, dto);
    return (await this.findById(id))!;
  }

  async delete(id: string): Promise<void> {
    await this.repo.delete(id);
  }

  async updatePassword(id: string, hashedPassword: string): Promise<void> {
    await this.repo.update(id, { password: hashedPassword });
  }

  async updateRefreshToken(
    id: string,
    hashedToken: string | null,
  ): Promise<void> {
    await this.repo.update(id, { refreshTokenHash: hashedToken as any });
  }

  async updateLastLogin(id: string): Promise<void> {
    await this.repo.update(id, { lastLoginAt: new Date() });
  }

  async existsByEmail(email: string): Promise<boolean> {
    const count = await this.repo.count({ where: { email } });
    return count > 0;
  }

  async findAll(
    page: number,
    limit: number,
  ): Promise<{ data: User[]; total: number }> {
    const skip = getSkip(page, limit);
    const [data, total] = await this.repo.findAndCount({
      where: { isActive: true },
      skip,
      take: limit,
      order: { createdAt: 'DESC' },
    });
    return { data, total };
  }
}
