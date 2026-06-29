import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User, AuthProvider } from '../../modules/users/domain/entities/user.entity';
import { UserRole } from '../../shared/enums/user-role.enum';

export async function seedAdmin(dataSource: DataSource): Promise<User> {
  const userRepo = dataSource.getRepository(User);

  const ADMIN_EMAIL = 'admin@nctu.edu.eg';
  const ADMIN_PASSWORD = 'Admin@123456';

  let admin = await userRepo.findOne({ where: { email: ADMIN_EMAIL } });

  if (admin) {
    // Update role to ADMIN if needed
    if (admin.role !== UserRole.ADMIN) {
      admin.role = UserRole.ADMIN;
      await userRepo.save(admin);
      console.log(`🔄 Updated existing user to ADMIN role`);
    } else {
      console.log(`ℹ️  Admin already exists: ${ADMIN_EMAIL}`);
    }
    return admin;
  }

  const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 10);

  admin = userRepo.create({
    email: ADMIN_EMAIL,
    name: 'System Administrator',
    password: hashedPassword,
    role: UserRole.ADMIN,
    authProvider: AuthProvider.LOCAL,
    isActive: true,
    isEmailVerified: true,
  });

  await userRepo.save(admin);

  console.log('');
  console.log('==========================================');
  console.log('✅ Admin user created successfully!');
  console.log('==========================================');
  console.log(`   Email:    ${ADMIN_EMAIL}`);
  console.log(`   Password: ${ADMIN_PASSWORD}`);
  console.log(`   Role:     ADMIN`);
  console.log('==========================================');
  console.log('');

  return admin;
}
