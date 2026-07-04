import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AppService } from './app.service';
import { Public } from './shared/decorators/public.decorator';

@ApiTags('App')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Public()
  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Health check / welcome' })
  getHello(): { status: string; message: string } {
    return {
      status: 'ok',
      message: this.appService.getHello(),
    };
  }

  @Public()
  @Get('favicon.ico')
  @HttpCode(HttpStatus.NO_CONTENT)
  favicon(): void {
    return;
  }
}
