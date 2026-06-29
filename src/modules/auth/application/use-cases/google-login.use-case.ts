import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../../users/application/repositories/user.repository';
import { AuthRepository } from '../repositories/auth.repository';
import { TokenService } from '../../infrastructure/services/token.service';
import { GoogleProfile } from '../../infrastructure/strategies/google.strategy';

@Injectable()
export class GoogleLoginUseCase {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly authRepo: AuthRepository,
    private readonly tokenService: TokenService,
  ) {}

  async execute(profile: GoogleProfile, userAgent?: string, ip?: string) {
    // 1) Check if user exists by googleId
    let user = await this.userRepo.findByGoogleId(profile.googleId);

    // 2) If not, check by email (maybe they registered locally before)
    if (!user) {
      const existingUser = await this.userRepo.findByEmail(profile.email);

      if (existingUser) {
        // Link Google account to existing local user
        user = await this.userRepo.linkGoogleAccount(
          existingUser.id,
          profile.googleId,
          profile.avatarUrl,
        );
      } else {
        // 3) Create new Google user
        user = await this.userRepo.createGoogleUser({
          email: profile.email,
          name: profile.name,
          googleId: profile.googleId,
          avatarUrl: profile.avatarUrl,
        });
      }
    }

    // 4) Generate tokens
    const payload = { sub: user.id, email: user.email, role: user.role };
    const accessToken = this.tokenService.generateAccessToken(payload);
    const refreshToken = this.tokenService.generateRefreshToken(payload);

    // 5) Save session
    await this.authRepo.createSession({
      userId: user.id,
      refreshTokenHash: this.tokenService.hashToken(refreshToken),
      userAgent: userAgent ?? null,
      ipAddress: ip ?? null,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    await this.userRepo.updateRefreshToken(
      user.id,
      this.tokenService.hashToken(refreshToken),
    );
    await this.userRepo.updateLastLogin(user.id);

    return {
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        avatarUrl: user.avatarUrl,
        authProvider: user.authProvider,
      },
    };
  }
}
