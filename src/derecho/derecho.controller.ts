import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus } from '@nestjs/common';
import { DerechoService } from './derecho.service';
import { CreateDerechoDto } from './dto/create-derecho.dto';
import { UpdateDerechoDto } from './dto/update-derecho.dto';

@Controller('derecho')
export class DerechoController {
  constructor(private readonly derechoService: DerechoService) { }


  @Get()
  findAll() {
    return this.derechoService.findAll();
  }

  @Get(':tipoUsuario')
  async listadoDerechos(@Param('tipoUsuario') tipoUsuario: string, @Res() respuesta) {
    try {
      // Generar la consulta parametrizada
      const queryConsultaTipoUsuario = `SELECT * FROM DERECHO ORDER BY 2 ASC`;
      //const queryConsultaTipoUsuario = `SELECT * FROM DERECHO WHERE TIPOUSUARIO = ${tipoUsuario} ORDER BY 1 ASC`;
      console.log(queryConsultaTipoUsuario);
      // Ejecutar la consulta en el servicio
      const derechos = await this.derechoService.BuscarPorTipo(queryConsultaTipoUsuario);
      // Responder con los derechos encontrados
      return respuesta.status(HttpStatus.OK).json(derechos);
    } catch (error) {
      console.error('Error al buscar derechos por tipo de usuario:', error);
      return respuesta.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Error al buscar derechos por tipo de usuario.',
        error: error.message,
      });
    }
  }


}
