import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from '../../../shared/decorators/public.decorator';
import { GetFooterSettingsUseCase } from '../application/use-cases/get-footer-settings.use-case';
import { SettingsRepository } from '../application/repositories/settings.repository';

@ApiTags('Settings')
@Controller('settings')
export class SettingsController {
  constructor(
    private readonly getFooterUC: GetFooterSettingsUseCase,
    private readonly repo: SettingsRepository,
  ) {}

  @Public()
  @Get('footer')
  @ApiOperation({ summary: 'Get footer settings (social links, contact, resources)' })
  getFooter() {
    return this.getFooterUC.execute();
  }
}
