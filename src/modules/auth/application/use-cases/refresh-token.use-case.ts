import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthRepository } from '../repositories/auth.repository';
import { UserRepository } from '../../../users/application/repositories/user.repository';
import { TokenService } from '../../infrastructure/services/token.service';
import { RefreshTokenDto } from '../dtos/refresh-token.dto';

@Injectable()
export class RefreshTokenUseCase {
  constructor(
    private readonly authRepo: AuthRepository,
    private readonly userRepo: UserRepository,
    private readonly tokenService: TokenService,
  ) {}

  async execute(dto: RefreshTokenDto) {
    let payload;
    try {
      payload = this.tokenService.verifyRefreshToken(dto.refreshToken);
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const hash = this.tokenService.hashToken(dto.refreshToken);
    const session = await this.authRepo.findByRefreshTokenHash(hash);
    if (!session) {
      throw new UnauthorizedException('Session not found or expired');
    }

    const user = await this.userRepo.findById(payload.sub);
    if (!user || !user.isActive) {
      throw new UnauthorizedException('User not found or inactive');
    }

    // Rotate: invalidate old session, issue new pair
    await this.authRepo.invalidateSession(session.id);

    const newPayload = { sub: user.id, email: user.email, role: user.role };
    const newAccessToken = this.tokenService.generateAccessToken(newPayload);
    const newRefreshToken = this.tokenService.generateRefreshToken(newPayload);

    await this.authRepo.createSession({
      userId: user.id,
      refreshTokenHash: this.tokenService.hashToken(newRefreshToken),
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });
    await this.userRepo.updateRefreshToken(
      user.id,
      this.tokenService.hashToken(newRefreshToken),
    );

    return { accessToken: newAccessToken, refreshToken: newRefreshToken };
  }
}
