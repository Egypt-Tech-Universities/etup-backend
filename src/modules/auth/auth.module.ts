import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthSession } from './domain/entities/auth-session.entity';
import { AuthController } from './presentation/auth.controller';
import { AuthRepository } from './application/repositories/auth.repository';
import { TypeOrmAuthRepository } from './infrastructure/repositories/typeorm-auth.repository';
import { LoginUseCase } from './application/use-cases/login.use-case';
import { RegisterUseCase } from './application/use-cases/register.use-case';
import { RefreshTokenUseCase } from './application/use-cases/refresh-token.use-case';
import { LogoutUseCase } from './application/use-cases/logout.use-case';
import { GoogleLoginUseCase } from './application/use-cases/google-login.use-case';
import { TokenService } from './infrastructure/services/token.service';
import { JwtStrategy } from './infrastructure/strategies/jwt.strategy';
import { GoogleStrategy } from './infrastructure/strategies/google.strategy';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([AuthSession]),
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get('JWT_SECRET'),
        signOptions: { expiresIn: config.get('JWT_EXPIRES_IN') || '7d' },
      }),
    }),
    UsersModule,
  ],
  controllers: [AuthController],
  providers: [
    { provide: AuthRepository, useClass: TypeOrmAuthRepository },
    TokenService,
    JwtStrategy,
    GoogleStrategy,
    LoginUseCase,
    RegisterUseCase,
    RefreshTokenUseCase,
    LogoutUseCase,
    GoogleLoginUseCase,
  ],
  exports: [TokenService],
})
export class AuthModule {}
