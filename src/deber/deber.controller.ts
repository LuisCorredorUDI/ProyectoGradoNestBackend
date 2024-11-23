import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, Res } from '@nestjs/common';
import { DeberService } from './deber.service';
import { CreateDeberDto } from './dto/create-deber.dto';
import { UpdateDeberDto } from './dto/update-deber.dto';

@Controller('deber')
export class DeberController {
  constructor(private readonly deberService: DeberService) {}


  @Get('/lista/DeberEstudiantes')
  async listadoDeberesController(@Res() respuesta) {
    try {
      // Generar la consulta parametrizada
      const queryConsultaTipoUsuario = `SELECT * FROM DEBER ORDER BY 2 ASC`;
      console.log(queryConsultaTipoUsuario);
      // Ejecutar la consulta en el servicio
      const debers = await this.deberService.BuscarDeberesServices(queryConsultaTipoUsuario);
      // Responder con los debers encontrados
      return respuesta.status(HttpStatus.OK).json(debers);
    } catch (error) {
      console.error('Error al buscar deberes de usuario:', error);
      return respuesta.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Error al buscar deberes de usuario.',
        error: error.message,
      });
    }
  }

  //crud
  @Get('/detalle/:codigodeber')
  async Detalledeber(@Param('codigodeber') codigodeber: string, @Res() respuesta) {
    try {
      // Generar la consulta parametrizada
      const queryConsultaTipoUsuario = `SELECT * FROM DEBER WHERE CODIGO=${codigodeber} ORDER BY 2 ASC`;
      console.log(queryConsultaTipoUsuario);
      // Ejecutar la consulta en el servicio
      const debers = await this.deberService.BuscarDetalleServices(queryConsultaTipoUsuario);
      // Responder con los debers encontrados
      return respuesta.status(HttpStatus.OK).json(debers);
    } catch (error) {
      console.error('Error al buscar debers por tipo de usuario:', error);
      return respuesta.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Error al buscar debers por tipo de usuario.',
        error: error.message,
      });
    }
  }

  //crud
  @Post('/crear')
  async create(@Body() createdeberDto: CreateDeberDto, @Res() respuesta) {
    try {
      //Maximo codigo
      const codigoNuevo = await this.deberService.MaximoCodigodeber();
      // Generar la consulta parametrizada
      const queryConsultaTipoUsuario = `INSERT INTO DEBER(CODIGO,DETALLE)
                                        VALUES(${codigoNuevo},'${createdeberDto.DETALLE}')`;
      console.log(queryConsultaTipoUsuario);
      // Ejecutar la consulta en el servicio
      const debers = await this.deberService.CreardeberService(queryConsultaTipoUsuario);
      // Responder con los debers encontrados
      return respuesta.status(HttpStatus.OK).json(debers);
    } catch (error) {
      console.error('Error al Crear deber:', error);
      return respuesta.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Error al Crear deber',
        error: error.message,
      });
    }
  }

    @Patch('/Actualizar')
    async Update(@Body() createdeberDto: CreateDeberDto, @Res() respuesta) {
      try {
        // Generar la consulta parametrizada
        const queryConsultaTipoUsuario = `UPDATE DEBER SET DETALLE='${createdeberDto.DETALLE}'
                                          WHERE CODIGO='${createdeberDto.CODIGO}' `;
        console.log(queryConsultaTipoUsuario);
        // Ejecutar la consulta en el servicio
        const debers = await this.deberService.ActualizardeberService(queryConsultaTipoUsuario);
        // Responder con los debers encontrados
        return respuesta.status(HttpStatus.OK).json(debers);
      } catch (error) {
        console.error('Error al actualizar deber', error);
        return respuesta.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          message: 'Error al actualizar deber',
          error: error.message,
        });
      }
    }



}
