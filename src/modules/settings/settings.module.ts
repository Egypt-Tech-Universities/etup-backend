import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SiteSetting } from './domain/entities/site-setting.entity';
import { SettingsController } from './presentation/settings.controller';
import { SettingsRepository } from './application/repositories/settings.repository';
import { TypeOrmSettingsRepository } from './infrastructure/repositories/typeorm-settings.repository';
import { GetFooterSettingsUseCase } from './application/use-cases/get-footer-settings.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([SiteSetting])],
  controllers: [SettingsController],
  providers: [
    { provide: SettingsRepository, useClass: TypeOrmSettingsRepository },
    GetFooterSettingsUseCase,
  ],
  exports: [SettingsRepository],
})
export class SettingsModule {}
