import { Module } from '@nestjs/common';
import { LookupsController } from './presentation/lookups.controller';

@Module({
  controllers: [LookupsController],
})
export class LookupsModule {}
