import { AuthSession } from '../../domain/entities/auth-session.entity';

export abstract class AuthRepository {
  abstract createSession(data: Partial<AuthSession>): Promise<AuthSession>;
  abstract findByRefreshTokenHash(hash: string): Promise<AuthSession | null>;
  abstract invalidateSession(id: string): Promise<void>;
  abstract invalidateAllUserSessions(userId: string): Promise<void>;
  abstract deleteExpiredSessions(): Promise<void>;
}
