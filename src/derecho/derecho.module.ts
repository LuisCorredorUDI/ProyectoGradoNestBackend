import { Module } from '@nestjs/common';
import { DerechoService } from './derecho.service';
import { DerechoController } from './derecho.controller';

@Module({
  controllers: [DerechoController],
  providers: [DerechoService],
})
export class DerechoModule {}
