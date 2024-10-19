import { Module } from '@nestjs/common';
import { ObservadorService } from './observador.service';
import { ObservadorController } from './observador.controller';

@Module({
  controllers: [ObservadorController],
  providers: [ObservadorService],
})
export class ObservadorModule {}
