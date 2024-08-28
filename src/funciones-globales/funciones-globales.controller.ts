import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FuncionesGlobalesService } from './funciones-globales.service';


@Controller('funciones-globales')
export class FuncionesGlobalesController {
  constructor(private readonly funcionesGlobalesService: FuncionesGlobalesService) {}

}
