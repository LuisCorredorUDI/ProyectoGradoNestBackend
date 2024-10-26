import { Controller, Get, Post, Body, Patch, Param, Delete, Catch, Res, HttpStatus } from '@nestjs/common';
import { ObservadorService } from './observador.service';
import { CreateObservadorDto } from './dto/create-observador.dto';
import { UpdateObservadorDto } from './dto/update-observador.dto';

@Controller('observador')
export class ObservadorController {
  constructor(private readonly observadorService: ObservadorService) { }

  //crud
  @Post('/CrearObservador')
  async crearObservador(@Body() createObservadorDto: CreateObservadorDto, @Res() respuesta) {
    try {
      const idObservadorMax = (await this.observadorService.MaximoCodigoObservador());
      const consulta = `INSERT INTO OBSERVADOR (CODIGO,TITULO,DETALLE,USUARIOOBSERVACION)
                        VALUES(${idObservadorMax},
                               '${createObservadorDto.TITULO}',
                               '${createObservadorDto.DETALLE}',
                               ${createObservadorDto.USUARIOOBSERVACION})`;
      console.log(consulta); // Verificar la consulta generada
      // Ejecutar la consulta y devolver la respuesta
      const mensaje = await this.observadorService.CrearObservacion(consulta);
      return respuesta.status(HttpStatus.OK).json(mensaje);
    } catch (error) {
      console.error('Error en la creación de Observacion:', error); // Log del error para más detalles

      // Mensaje detallado de error
      let mensajeError = 'Error en la creación de Observacion.';
      if (error.code === 'ORA-00001') {
        mensajeError += ' Violación de clave única: Observacion ya existe.';
      } else if (error.code === 'ORA-01400') {
        mensajeError += ' No se pueden insertar valores nulos en las columnas obligatorias.';
      } else if (error.code === 'ORA-00984') {
        mensajeError += ' Error en la sintaxis de la consulta. Revisa los datos ingresados.';
      } else {
        mensajeError += ` Error inesperado: ${error.message || error}`;
      }

      return respuesta.status(HttpStatus.INTERNAL_SERVER_ERROR).json(mensajeError);
    }
  }


}
