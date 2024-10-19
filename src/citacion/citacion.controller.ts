import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus } from '@nestjs/common';
import { CitacionService } from './citacion.service';
import { CreateCitacionDto } from './dto/create-citacion.dto';
import { UpdateCitacionDto } from './dto/update-citacion.dto';

@Controller('citacion')
export class CitacionController {
  constructor(private readonly citacionService: CitacionService) { }


  //detalle de una citacion
  @Get('/DetalleCitacionObservacion/:codCitacion')
  async DetalleCitacionObservacion(@Param('codCitacion') codCitacion: string, @Res() respuesta) {
    try {
      const consulta = `SELECT C.CODIGO, 
                              C.DETALLE, 
                              C.FECHAINICIO, 
                              C.FECHAFIN, 
                              C.USUARIOCITACION,
                              (SELECT U.NOMBRES||' '||U.APELLIDOS FROM USUARIO U WHERE U.ID = C.USUARIOCITACION) AS NOMBRECITADO,
                              O.TITULO,
                              O.DETALLE as DETALLEOBSERVACION,
                              (SELECT U.NOMBRES||' '||U.APELLIDOS FROM USUARIO U WHERE U.ID = O.USUARIOOBSERVACION) AS NOMBREOBSERVACION
                        FROM CITACION C, CITACION_OBSERVADOR CO, OBSERVADOR O
                        WHERE C.CODIGO = CO.CODIGOCITACION
                        AND CO.CODIGOOBSERVADOR = O.CODIGO
                        AND C.CODIGO = ${codCitacion}
                        ORDER BY C.CODIGO DESC`;
      console.log(consulta); // Verificar la consulta generada
      // Ejecutar la consulta y devolver la respuesta
      const mensaje = await this.citacionService.DetalleCitacionObservacionService(consulta);
      return respuesta.status(HttpStatus.OK).json(mensaje);
    } catch (error) {
      console.error('Error listado citaciones:', error); // Log del error para más detalles

      // Mensaje detallado de error
      let mensajeError = 'Error listado citaciones.';
      if (error.code === 'ORA-00001') {
        mensajeError += ' Violación de clave única: listado citaciones ya existe.';
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

  //listado filtrado de citaciones
  @Get('/DetalleCitacion/:codCitacion')
  async DetalleCitacion(@Param('codCitacion') codCitacion: string, @Res() respuesta) {
    try {
      const consulta = `SELECT C.CODIGO, 
                              C.DETALLE, 
                              C.FECHAINICIO, 
                              C.FECHAFIN, 
                              C.USUARIOCITACION,
                              (SELECT NVL(COUNT(CODIGOCITACION),0) FROM CITACION_OBSERVADOR CO WHERE C.CODIGO = CO.CODIGOCITACION) AS CITACIONESNUM
                        FROM CITACION C
                        WHERE C.CODIGO = ${codCitacion}
                        ORDER BY C.CODIGO DESC`;
      console.log(consulta); // Verificar la consulta generada
      // Ejecutar la consulta y devolver la respuesta
      const mensaje = await this.citacionService.ListadoCitacionesService(consulta);
      return respuesta.status(HttpStatus.OK).json(mensaje);
    } catch (error) {
      console.error('Error listado citaciones:', error); // Log del error para más detalles

      // Mensaje detallado de error
      let mensajeError = 'Error listado citaciones.';
      if (error.code === 'ORA-00001') {
        mensajeError += ' Violación de clave única: listado citaciones ya existe.';
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

  //listado principal de citaciones
  @Get('/ListarCitaciones')
  async ListadoCitaciones(@Res() respuesta) {
    try {
      const consulta = `SELECT C.CODIGO, 
                            C.DETALLE, 
                            C.FECHAINICIO, 
                            C.FECHAFIN, 
                            C.USUARIOCITACION,
                            (SELECT U.NOMBRES||' '||U.APELLIDOS FROM USUARIO U WHERE U.ID=C.USUARIOCITACION) AS NOMBRECITADO,
                            (SELECT NVL(COUNT(CODIGOCITACION),0) FROM CITACION_OBSERVADOR CO WHERE C.CODIGO = CO.CODIGOCITACION) AS CITACIONESNUM
                      FROM CITACION C
                      ORDER BY CODIGO DESC`;
      console.log(consulta); // Verificar la consulta generada
      // Ejecutar la consulta y devolver la respuesta
      const mensaje = await this.citacionService.ListadoCitacionesService(consulta);
      return respuesta.status(HttpStatus.OK).json(mensaje);
    } catch (error) {
      console.error('Error listado citaciones:', error); // Log del error para más detalles

      // Mensaje detallado de error
      let mensajeError = 'Error listado citaciones.';
      if (error.code === 'ORA-00001') {
        mensajeError += ' Violación de clave única: listado citaciones ya existe.';
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

  //listado filtrado de citaciones
  @Get('/ListarCitacionesFill/:idAcudiente')
  async ListadoCitacionesFiltrado(@Param('idAcudiente') idAcudiente: string, @Res() respuesta) {
    try {
      const consulta = `SELECT C.CODIGO, 
                            C.DETALLE, 
                            C.FECHAINICIO, 
                            C.FECHAFIN, 
                            C.USUARIOCITACION,
                            (SELECT U.NOMBRES||' '||U.APELLIDOS FROM USUARIO U WHERE U.ID=C.USUARIOCITACION) AS NOMBRECITADO,
                            (SELECT NVL(COUNT(CODIGOCITACION),0) FROM CITACION_OBSERVADOR CO WHERE C.CODIGO = CO.CODIGOCITACION) AS CITACIONESNUM
                      FROM CITACION C
                      WHERE USUARIOCITACION = ${idAcudiente}
                      ORDER BY CODIGO DESC`;
      console.log(consulta); // Verificar la consulta generada
      // Ejecutar la consulta y devolver la respuesta
      const mensaje = await this.citacionService.ListadoCitacionesService(consulta);
      return respuesta.status(HttpStatus.OK).json(mensaje);
    } catch (error) {
      console.error('Error listado citaciones:', error); // Log del error para más detalles

      // Mensaje detallado de error
      let mensajeError = 'Error listado citaciones.';
      if (error.code === 'ORA-00001') {
        mensajeError += ' Violación de clave única: listado citaciones ya existe.';
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

  //Crud
  @Post('/CrearCitacion')
  async create(@Body() createCitacionDto: CreateCitacionDto, @Res() respuesta) {
    try {
      const idCitacionMax = (await this.citacionService.MaximoCodigoCitacion()) + 1;
      const consulta = ` INSERT INTO CITACION (CODIGO,DETALLE,FECHAINICIO,FECHAFIN,USUARIOCITACION)
                       VALUES (${idCitacionMax},
                              '${createCitacionDto.DETALLE}',
                              TO_DATE('${createCitacionDto.FECHAINICIO}','YYYY/MM/DD HH24:MI'),
                              TO_DATE('${createCitacionDto.FECHAFIN}','YYYY/MM/DD HH24:MI'),
                              ${createCitacionDto.USUARIOCITACION})`;

      console.log(consulta); // Verificar la consulta generada
      // Ejecutar la consulta y devolver la respuesta
      const mensaje = await this.citacionService.CrearCitacionService(consulta);
      return respuesta.status(HttpStatus.OK).json(mensaje);
    } catch (error) {
      console.error('Error en la creación de Citacion:', error); // Log del error para más detalles

      // Mensaje detallado de error
      let mensajeError = 'Error en la creación de Citacion.';
      if (error.code === 'ORA-00001') {
        mensajeError += ' Violación de clave única: Citacion ya existe.';
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

  @Post('/Intermedia')
  async registroIntermedia(@Res() respuesta) {
    try {
      const idCitObsMax = (await this.citacionService.MaximoIntermedia()) + 1;
      const consulta = ` INSERT INTO CITACION_OBSERVADOR (CODIGOCITACIONOBSERVADOR,CODIGOCITACION,CODIGOOBSERVADOR)
                       VALUES (${idCitObsMax},(SELECT MAX(CODIGO) FROM CITACION),(SELECT MAX(CODIGO) FROM OBSERVADOR))`;

      console.log(consulta); // Verificar la consulta generada
      // Ejecutar la consulta y devolver la respuesta
      const mensaje = await this.citacionService.CrearIntermedia(consulta);
      return respuesta.status(HttpStatus.OK).json(mensaje);
    } catch (error) {
      console.error('Error en la creación de Intermedia:', error); // Log del error para más detalles

      // Mensaje detallado de error
      let mensajeError = 'Error en la creación de Intermedia.';
      if (error.code === 'ORA-00001') {
        mensajeError += ' Violación de clave única: Intermedia ya existe.';
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

  @Delete('EliminarCitacion/:id')
  async remove(@Param('id') id: string, @Res() respuesta) {
    try {
      //Ejecutamos el proceso almacenado en Bd - Creado para este caso en especial.
      const consulta1 = `BEGIN
                              PR_ELIMINA_CITACION(${id});
                          END;`;
      console.log(consulta1); // Verificar la consulta generada
      // Ejecutar la consulta y devolver la respuesta
      const mensaje1 = await this.citacionService.EliminarCitacionService(consulta1);
      return respuesta.status(HttpStatus.OK).json(mensaje1);
    } catch (error) {
      console.error('Error en la creación de Citacion:', error); // Log del error para más detalles

      // Mensaje detallado de error
      let mensajeError = 'Error en la creación de Citacion.';
      if (error.code === 'ORA-00001') {
        mensajeError += ' Violación de clave única: Citacion ya existe.';
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
