import { SetMetadata } from '@nestjs/common';
import { ROLES_KEY } from '../constants/roles.constants';
import { UserRole } from '../enums/user-role.enum';

/**
 * Restrict route access to specific roles
 * Usage: @Roles(UserRole.ADMIN)
 */
export const Roles = (...roles: UserRole[]) => SetMetadata(ROLES_KEY, roles);
