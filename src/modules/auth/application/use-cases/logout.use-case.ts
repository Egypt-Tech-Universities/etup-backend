import { Injectable } from '@nestjs/common';
import { AuthRepository } from '../repositories/auth.repository';
import { UserRepository } from '../../../users/application/repositories/user.repository';

@Injectable()
export class LogoutUseCase {
  constructor(
    private readonly authRepo: AuthRepository,
    private readonly userRepo: UserRepository,
  ) {}

  async execute(userId: string): Promise<void> {
    await this.authRepo.invalidateAllUserSessions(userId);
    await this.userRepo.updateRefreshToken(userId, null);
  }
}
