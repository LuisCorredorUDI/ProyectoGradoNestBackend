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

  @Get('/detalle/:codigoderecho')
  async DetalleDerecho(@Param('codigoderecho') codigoderecho: string, @Res() respuesta) {
    try {
      // Generar la consulta parametrizada
      const queryConsultaTipoUsuario = `SELECT * FROM DERECHO WHERE CODIGO=${codigoderecho} ORDER BY 2 ASC`;
      //const queryConsultaTipoUsuario = `SELECT * FROM DERECHO WHERE TIPOUSUARIO = ${tipoUsuario} ORDER BY 1 ASC`;
      console.log(queryConsultaTipoUsuario);
      // Ejecutar la consulta en el servicio
      const derechos = await this.derechoService.BuscarDetalleServices(queryConsultaTipoUsuario);
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

  //crud
  @Post('/crear')
  async create(@Body() createDerechoDto: CreateDerechoDto, @Res() respuesta) {
    try {
      //Maximo codigo
      const codigoNuevo = await this.derechoService.MaximoCodigoDerecho();
      // Generar la consulta parametrizada
      const queryConsultaTipoUsuario = `INSERT INTO DERECHO(CODIGO,DETALLE,TIPOUSUARIO)
                                        VALUES(${codigoNuevo},'${createDerechoDto.DETALLE}','2')`;
      //const queryConsultaTipoUsuario = `SELECT * FROM DERECHO WHERE TIPOUSUARIO = ${tipoUsuario} ORDER BY 1 ASC`;
      console.log(queryConsultaTipoUsuario);
      // Ejecutar la consulta en el servicio
      const derechos = await this.derechoService.CrearDerechoService(queryConsultaTipoUsuario);
      // Responder con los derechos encontrados
      return respuesta.status(HttpStatus.OK).json(derechos);
    } catch (error) {
      console.error('Error al Crear Derecho:', error);
      return respuesta.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Error al Crear Derecho',
        error: error.message,
      });
    }
  }

    @Patch('/Actualizar')
    async Update(@Body() createDerechoDto: CreateDerechoDto, @Res() respuesta) {
      try {
        // Generar la consulta parametrizada
        const queryConsultaTipoUsuario = `UPDATE DERECHO SET DETALLE='${createDerechoDto.DETALLE}'
                                          WHERE CODIGO='${createDerechoDto.CODIGO}' `;
        //const queryConsultaTipoUsuario = `SELECT * FROM DERECHO WHERE TIPOUSUARIO = ${tipoUsuario} ORDER BY 1 ASC`;
        console.log(queryConsultaTipoUsuario);
        // Ejecutar la consulta en el servicio
        const derechos = await this.derechoService.ActualizarDerechoService(queryConsultaTipoUsuario);
        // Responder con los derechos encontrados
        return respuesta.status(HttpStatus.OK).json(derechos);
      } catch (error) {
        console.error('Error al actualizar derecho', error);
        return respuesta.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          message: 'Error al actualizar derecho',
          error: error.message,
        });
      }
    }


}
