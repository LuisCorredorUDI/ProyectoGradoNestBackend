import { Module } from '@nestjs/common';
import { FuncionesGlobalesService } from './funciones-globales.service';
import { FuncionesGlobalesController } from './funciones-globales.controller';

@Module({
  controllers: [FuncionesGlobalesController],
  providers: [FuncionesGlobalesService],
})
export class FuncionesGlobalesModule {}
