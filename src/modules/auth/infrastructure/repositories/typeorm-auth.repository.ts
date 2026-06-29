import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThan, Repository } from 'typeorm';
import { AuthSession } from '../../domain/entities/auth-session.entity';
import { AuthRepository } from '../../application/repositories/auth.repository';

@Injectable()
export class TypeOrmAuthRepository extends AuthRepository {
  constructor(
    @InjectRepository(AuthSession)
    private readonly repo: Repository<AuthSession>,
  ) {
    super();
  }

  async createSession(data: Partial<AuthSession>): Promise<AuthSession> {
    const session = this.repo.create(data);
    return this.repo.save(session);
  }

  async findByRefreshTokenHash(hash: string): Promise<AuthSession | null> {
    return this.repo.findOne({ where: { refreshTokenHash: hash, isValid: true } });
  }

  async invalidateSession(id: string): Promise<void> {
    await this.repo.update(id, { isValid: false });
  }

  async invalidateAllUserSessions(userId: string): Promise<void> {
    await this.repo.update({ userId }, { isValid: false });
  }

  async deleteExpiredSessions(): Promise<void> {
    await this.repo.delete({ expiresAt: LessThan(new Date()) });
  }
}
