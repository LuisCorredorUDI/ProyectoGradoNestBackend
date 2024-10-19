import { Module } from '@nestjs/common';
import { CitacionService } from './citacion.service';
import { CitacionController } from './citacion.controller';

@Module({
  controllers: [CitacionController],
  providers: [CitacionService],
})
export class CitacionModule {}
