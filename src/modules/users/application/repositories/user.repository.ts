import { User } from '../../domain/entities/user.entity';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';

export interface CreateGoogleUserData {
  email: string;
  name: string;
  googleId: string;
  avatarUrl?: string;
}

export abstract class UserRepository {
  abstract create(dto: CreateUserDto, hashedPassword: string): Promise<User>;
  abstract createGoogleUser(data: CreateGoogleUserData): Promise<User>;
  abstract findById(id: string): Promise<User | null>;
  abstract findByEmail(email: string): Promise<User | null>;
  abstract findByGoogleId(googleId: string): Promise<User | null>;
  abstract linkGoogleAccount(userId: string, googleId: string, avatarUrl?: string): Promise<User>;
  abstract update(id: string, dto: UpdateUserDto): Promise<User>;
  abstract delete(id: string): Promise<void>;
  abstract updatePassword(id: string, hashedPassword: string): Promise<void>;
  abstract updateRefreshToken(id: string, hashedToken: string | null): Promise<void>;
  abstract updateLastLogin(id: string): Promise<void>;
  abstract existsByEmail(email: string): Promise<boolean>;
  abstract findAll(page: number, limit: number): Promise<{ data: User[]; total: number }>;
}
