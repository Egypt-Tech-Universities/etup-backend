import { ConflictException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserRepository } from '../../../users/application/repositories/user.repository';
import { AuthRepository } from '../repositories/auth.repository';
import { TokenService } from '../../infrastructure/services/token.service';
import { RegisterDto } from '../dtos/register.dto';
import { UserRole } from '../../../../shared/enums/user-role.enum';

@Injectable()
export class RegisterUseCase {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly authRepo: AuthRepository,
    private readonly tokenService: TokenService,
  ) {}

  async execute(dto: RegisterDto, userAgent?: string, ip?: string) {
    const exists = await this.userRepo.existsByEmail(dto.email);
    if (exists) {
      throw new ConflictException('Email already registered');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const user = await this.userRepo.create(
      { ...dto, role: UserRole.STUDENT },
      hashedPassword,
    );

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
