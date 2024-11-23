import { Module } from '@nestjs/common';
import { DeberService } from './deber.service';
import { DeberController } from './deber.controller';

@Module({
  controllers: [DeberController],
  providers: [DeberService],
})
export class DeberModule {}
