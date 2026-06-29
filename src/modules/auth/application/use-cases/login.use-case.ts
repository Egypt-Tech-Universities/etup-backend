import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserRepository } from '../../../users/application/repositories/user.repository';
import { AuthRepository } from '../repositories/auth.repository';
import { TokenService } from '../../infrastructure/services/token.service';
import { LoginDto } from '../dtos/login.dto';

@Injectable()
export class LoginUseCase {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly authRepo: AuthRepository,
    private readonly tokenService: TokenService,
  ) {}

  async execute(dto: LoginDto, userAgent?: string, ip?: string) {
    const user = await this.userRepo.findByEmail(dto.email);
    if (!user || !user.isActive) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Check if user has password (might be a Google-only user)
    if (!user.password) {
      throw new UnauthorizedException(
        'This account was created with Google. Please login with Google.',
      );
    }

    const isMatch = await bcrypt.compare(dto.password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user.id, email: user.email, role: user.role };
    const accessToken = this.tokenService.generateAccessToken(payload);
    const refreshToken = this.tokenService.generateRefreshToken(payload);

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
      },
    };
  }
}
