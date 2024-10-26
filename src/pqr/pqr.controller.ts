import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException, InternalServerErrorException, HttpStatus, Res } from '@nestjs/common';
import { PqrService } from './pqr.service';
import { CreatePqrDto } from './dto/create-pqr.dto';
import { UpdatePqrDto } from './dto/update-pqr.dto';

@Controller('pqr')
export class PqrController {
  constructor(private readonly pqrService: PqrService) { }

  //Listados para usuarios estudiante y acudiente
  @Get('/PorUsuarioSinRevisar/:id')
  async BusquedaPorUsuarioSinRevisar(@Param('id') id: string, @Res() respuesta) {
    try {
      // Generar la consulta SQL parametrizada para prevenir inyección SQL
      const queryEnvia = `SELECT CODIGO,DETALLE,RESPUESTA,TIPOPQR,USUARIOGENERA,FECHACREACION,FECHARESPUESTA,ESTADOPQR,CODIGODERECHO,NUMEROREFERENCIA,
       (SELECT NOMBRE FROM TIPOPQR WHERE CODIGO=TIPOPQR) AS NOMBRETIPOPQR,
       CASE TIPOPQR
           WHEN 1 THEN 'Alta'
           WHEN 2 THEN 'Alta'
           WHEN 3 THEN 'Media'
           WHEN 4 THEN 'Baja'
           ELSE 'Desconocido'
       END AS NOMBRE_GRAVEDADTIPOPQR FROM PQR WHERE ESTADOPQR = 0 AND USUARIOGENERA = ${id} ORDER BY NUMEROREFERENCIA ASC`;

      // Llamar al servicio con la consulta y los parámetros
      const pqrList = await this.pqrService.BusquedaPqrPorUsuario(queryEnvia);

      // Responder con la lista de PQR en formato JSON
      return respuesta.status(HttpStatus.OK).json(pqrList);
    } catch (error) {
      console.error('Error en la búsqueda de PQR por usuario:', error); // Log del error para más detalles

      // Devolver un mensaje de error detallado
      return respuesta.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Error al buscar PQR por usuario.',
        error: error.message,
      });
    }
  }

  @Get('/PorUsuarioRevisadas/:id')
  async BusquedaPorUsuarioRevisadas(@Param('id') id: string, @Res() respuesta) {
    try {
      // Generar la consulta SQL parametrizada para prevenir inyección SQL
      const queryEnvia = `SELECT CODIGO,DETALLE,RESPUESTA,TIPOPQR,USUARIOGENERA,FECHACREACION,FECHARESPUESTA,ESTADOPQR,CODIGODERECHO,NUMEROREFERENCIA,
       (SELECT NOMBRE FROM TIPOPQR WHERE CODIGO=TIPOPQR) AS NOMBRETIPOPQR,
       CASE TIPOPQR
           WHEN 1 THEN 'Alta'
           WHEN 2 THEN 'Alta'
           WHEN 3 THEN 'Media'
           WHEN 4 THEN 'Baja'
           ELSE 'Desconocido'
       END AS NOMBRE_GRAVEDADTIPOPQR FROM PQR WHERE ESTADOPQR != 0 AND USUARIOGENERA = ${id} ORDER BY NUMEROREFERENCIA ASC`;

      // Llamar al servicio con la consulta y los parámetros
      const pqrList = await this.pqrService.BusquedaPqrPorUsuario(queryEnvia);

      // Responder con la lista de PQR en formato JSON
      return respuesta.status(HttpStatus.OK).json(pqrList);
    } catch (error) {
      console.error('Error en la búsqueda de PQR por usuario:', error); // Log del error para más detalles

      // Devolver un mensaje de error detallado
      return respuesta.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Error al buscar PQR por usuario.',
        error: error.message,
      });
    }
  }

  @Get('/PorUsuarioTodas/:id')
  async BusquedaPorUsuarioTodas(@Param('id') id: string, @Res() respuesta) {
    try {
      // Generar la consulta SQL parametrizada para prevenir inyección SQL
      const queryEnvia = `SELECT CODIGO,DETALLE,RESPUESTA,TIPOPQR,USUARIOGENERA,FECHACREACION,FECHARESPUESTA,ESTADOPQR,CODIGODERECHO,NUMEROREFERENCIA,
       (SELECT NOMBRE FROM TIPOPQR WHERE CODIGO=TIPOPQR) AS NOMBRETIPOPQR,
       CASE TIPOPQR
           WHEN 1 THEN 'Alta'
           WHEN 2 THEN 'Alta'
           WHEN 3 THEN 'Media'
           WHEN 4 THEN 'Baja'
           ELSE 'Desconocido'
       END AS NOMBRE_GRAVEDADTIPOPQR FROM PQR WHERE USUARIOGENERA = ${id} ORDER BY NUMEROREFERENCIA ASC`;

      // Llamar al servicio con la consulta y los parámetros
      const pqrList = await this.pqrService.BusquedaPqrPorUsuario(queryEnvia);

      // Responder con la lista de PQR en formato JSON
      return respuesta.status(HttpStatus.OK).json(pqrList);
    } catch (error) {
      console.error('Error en la búsqueda de PQR por usuario:', error); // Log del error para más detalles

      // Devolver un mensaje de error detallado
      return respuesta.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Error al buscar PQR por usuario.',
        error: error.message,
      });
    }
  }


  //Listados para coordinadores
  @Get('/PorCoordinadorSinRevisar/')
  async BusquedaPorCoordinadorSinRevisar(@Res() respuesta) {
    try {
      // Generar la consulta SQL parametrizada para prevenir inyección SQL
      const queryEnvia = `SELECT CODIGO,DETALLE,RESPUESTA,TIPOPQR,USUARIOGENERA,FECHACREACION,FECHARESPUESTA,ESTADOPQR,CODIGODERECHO,NUMEROREFERENCIA,
       (SELECT NOMBRE FROM TIPOPQR WHERE CODIGO=TIPOPQR) AS NOMBRETIPOPQR,
       CASE TIPOPQR
           WHEN 1 THEN 'Alta'
           WHEN 2 THEN 'Alta'
           WHEN 3 THEN 'Media'
           WHEN 4 THEN 'Baja'
           ELSE 'Desconocido'
       END AS NOMBRE_GRAVEDADTIPOPQR FROM PQR WHERE ESTADOPQR = 0 ORDER BY NUMEROREFERENCIA ASC`;

      // Llamar al servicio con la consulta y los parámetros
      const pqrList = await this.pqrService.BusquedaPqrPorCoordinador(queryEnvia);

      // Responder con la lista de PQR en formato JSON
      return respuesta.status(HttpStatus.OK).json(pqrList);
    } catch (error) {
      console.error('Error en la búsqueda de PQR por Coordinador:', error); // Log del error para más detalles

      // Devolver un mensaje de error detallado
      return respuesta.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Error al buscar PQR por Coordinador.',
        error: error.message,
      });
    }
  }

  @Get('/PorCoordinadorRevisadas/')
  async BusquedaPorCoordinadorRevisadas(@Res() respuesta) {
    try {
      // Generar la consulta SQL parametrizada para prevenir inyección SQL
      const queryEnvia = `SELECT CODIGO,DETALLE,RESPUESTA,TIPOPQR,USUARIOGENERA,FECHACREACION,FECHARESPUESTA,ESTADOPQR,CODIGODERECHO,NUMEROREFERENCIA,
       (SELECT NOMBRE FROM TIPOPQR WHERE CODIGO=TIPOPQR) AS NOMBRETIPOPQR,
       CASE TIPOPQR
           WHEN 1 THEN 'Alta'
           WHEN 2 THEN 'Alta'
           WHEN 3 THEN 'Media'
           WHEN 4 THEN 'Baja'
           ELSE 'Desconocido'
       END AS NOMBRE_GRAVEDADTIPOPQR FROM PQR WHERE ESTADOPQR != 0 ORDER BY NUMEROREFERENCIA ASC`;

      // Llamar al servicio con la consulta y los parámetros
      const pqrList = await this.pqrService.BusquedaPqrPorCoordinador(queryEnvia);

      // Responder con la lista de PQR en formato JSON
      return respuesta.status(HttpStatus.OK).json(pqrList);
    } catch (error) {
      console.error('Error en la búsqueda de PQR por Coordinador:', error); // Log del error para más detalles

      // Devolver un mensaje de error detallado
      return respuesta.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Error al buscar PQR por Coordinador.',
        error: error.message,
      });
    }
  }

  @Get('/PorCoordinadorTodas/')
  async BusquedaPorCoordinadorTodas(@Res() respuesta) {
    try {
      // Generar la consulta SQL parametrizada para prevenir inyección SQL
      const queryEnvia = `SELECT CODIGO,DETALLE,RESPUESTA,TIPOPQR,USUARIOGENERA,FECHACREACION,FECHARESPUESTA,ESTADOPQR,CODIGODERECHO,NUMEROREFERENCIA,
       (SELECT NOMBRE FROM TIPOPQR WHERE CODIGO=TIPOPQR) AS NOMBRETIPOPQR,
       CASE TIPOPQR
           WHEN 1 THEN 'Alta'
           WHEN 2 THEN 'Alta'
           WHEN 3 THEN 'Media'
           WHEN 4 THEN 'Baja'
           ELSE 'Desconocido'
       END AS NOMBRE_GRAVEDADTIPOPQR FROM PQR ORDER BY NUMEROREFERENCIA ASC`;

      // Llamar al servicio con la consulta y los parámetros
      const pqrList = await this.pqrService.BusquedaPqrPorCoordinador(queryEnvia);

      // Responder con la lista de PQR en formato JSON
      return respuesta.status(HttpStatus.OK).json(pqrList);
    } catch (error) {
      console.error('Error en la búsqueda de PQR por Coordinador:', error); // Log del error para más detalles

      // Devolver un mensaje de error detallado
      return respuesta.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Error al buscar PQR por Coordinador.',
        error: error.message,
      });
    }
  }

  //DETALLE
  @Get('/DetallePqr/:codigo/:referencia')
  async BusquedaDetalle(@Param('codigo') CODIGO: string, @Param('referencia') NUMEROREFERENCIA: string, @Res() respuesta) {
    try {
      // Generar la consulta SQL parametrizada para prevenir inyección SQL
      const queryEnvia = `SELECT CODIGO,
                              DETALLE,
                              RESPUESTA,
                              TIPOPQR,
                              USUARIOGENERA,
                              FECHACREACION,
                              FECHARESPUESTA,
                              ESTADOPQR,
                              (SELECT DETALLE FROM DERECHO WHERE CODIGO=CODIGODERECHO) AS DERECHO,
                              NUMEROREFERENCIA,
                              (SELECT NOMBRE FROM TIPOPQR WHERE CODIGO=TIPOPQR) AS NOMBRETIPOPQR,
                              CASE TIPOPQR
                                  WHEN 1 THEN 'Alta'
                                  WHEN 2 THEN 'Alta'
                                  WHEN 3 THEN 'Media'
                                  WHEN 4 THEN 'Baja'
                                  ELSE 'Desconocido'
                              END AS NOMBRE_GRAVEDADTIPOPQR
                        FROM PQR WHERE CODIGO=${CODIGO} AND NUMEROREFERENCIA=${NUMEROREFERENCIA} `;

      // Llamar al servicio con la consulta y los parámetros
      const pqrList = await this.pqrService.BusquedaDetalleService(queryEnvia);

      // Responder con la lista de PQR en formato JSON
      return respuesta.status(HttpStatus.OK).json(pqrList);
    } catch (error) {
      console.error('Error en la búsqueda de PQR por Coordinador:', error); // Log del error para más detalles

      // Devolver un mensaje de error detallado
      return respuesta.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Error al buscar PQR por Coordinador.',
        error: error.message,
      });
    }
  }

  //CRUD

  @Post('/CrearPqr/')
  async crearPqr(@Body() createPqrDto: CreatePqrDto, @Res() respuesta) {
    try {
      // Obtener el máximo código de PQR y sumarle 1
      const codigoNuevaPqr = (await this.pqrService.MaximoCodigoPqr());
      let referenciaNum = 0;
      referenciaNum = Number(codigoNuevaPqr) + 1000;

      // Generar la consulta SQL parametrizada
      const queryConsulta = `INSERT INTO PQR (CODIGO, DETALLE, TIPOPQR, USUARIOGENERA, CODIGODERECHO, NUMEROREFERENCIA) 
      VALUES (${codigoNuevaPqr}, '${createPqrDto.DETALLE}', ${createPqrDto.TIPOPQR}, ${createPqrDto.USUARIOGENERA}, ${createPqrDto.CODIGODERECHO}, ${referenciaNum})`;

      console.log(queryConsulta); // Verificar la consulta generada

      // Ejecutar la consulta y devolver la respuesta
      const mensaje = await this.pqrService.create(queryConsulta);
      return respuesta.status(HttpStatus.OK).json({ message: 'PQR creada exitosamente.', data: mensaje });
    } catch (error) {
      console.error('Error en la creación de la PQR:', error); // Log del error para más detalles

      // Mensaje detallado de error
      let mensajeError = 'Error en la creación de la PQR.';
      if (error.code === 'ORA-00001') {
        mensajeError += ' Violación de clave única: el código de PQR ya existe.';
      } else if (error.code === 'ORA-01400') {
        mensajeError += ' No se pueden insertar valores nulos en las columnas obligatorias.';
      } else if (error.code === 'ORA-00984') {
        mensajeError += ' Error en la sintaxis de la consulta. Revisa los datos ingresados.';
      } else if (error.code === 'ER_DUP_ENTRY') {
        mensajeError += ' El código de PQR ya existe.';
      } else if (error.code === 'ER_DATA_TOO_LONG') {
        mensajeError += ' Los datos proporcionados exceden la longitud permitida.';
      } else {
        mensajeError += ` Error inesperado: ${error.message || error}`;
      }
      return respuesta.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: mensajeError });
    }
  }

  @Patch('/ActualizarRespuesta/:codigo/:referencia')
  async actualizarRespuesta(@Param('codigo') CODIGO: string, @Param('referencia') NUMEROREFERENCIA: string, @Body() updatePqrDto: UpdatePqrDto, @Res() respuesta) {
    try {
      // Generar la consulta SQL parametrizada
      const queryConsulta = `UPDATE PQR 
                            SET RESPUESTA='${updatePqrDto.RESPUESTA}', 
                                FECHARESPUESTA = NOW(),
                                ESTADOPQR = 1 
                            WHERE CODIGO=${CODIGO} AND NUMEROREFERENCIA=${NUMEROREFERENCIA}`;

      console.log(queryConsulta); // Verificar la consulta generada

      // Ejecutar la consulta y devolver la respuesta
      const mensaje = await this.pqrService.updateRespuestaService(queryConsulta);
      return respuesta.status(HttpStatus.OK).json({ message: 'Respuesta actualizada exitosamente.', data: mensaje });
    } catch (error) {
      console.error('Error en la Actualizacion de la PQR:', error); // Log del error para más detalles

      // Mensaje detallado de error
      let mensajeError = 'Error en la Actualizacion de la PQR.';
      if (error.code === 'ORA-00001') {
        mensajeError += ' Violación de clave única: el código de PQR ya existe.';
      } else if (error.code === 'ORA-01400') {
        mensajeError += ' No se pueden insertar valores nulos en las columnas obligatorias.';
      } else if (error.code === 'ORA-00984') {
        mensajeError += ' Error en la sintaxis de la consulta. Revisa los datos ingresados.';
      } else if (error.code === 'ER_DUP_ENTRY') {
        mensajeError += ' El código de PQR ya existe.';
      } else if (error.code === 'ER_DATA_TOO_LONG') {
        mensajeError += ' Los datos proporcionados exceden la longitud permitida.';
      } else {
        mensajeError += ` Error inesperado: ${error.message || error}`;
      }
      return respuesta.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: mensajeError });
    }
  }

  @Patch('/CancelarPqr/:codigo/:referencia')
  async cancelarPqr(@Param('codigo') CODIGO: string, @Param('referencia') NUMEROREFERENCIA: string, @Body() updatePqrDto: UpdatePqrDto, @Res() respuesta) {
    try {
      // Generar la consulta SQL parametrizada
      const queryConsulta = `UPDATE PQR 
                            SET RESPUESTA='Cancelada por el usuario', 
                                FECHARESPUESTA = NOW(),
                                ESTADOPQR = 2 
                            WHERE CODIGO=${CODIGO} AND NUMEROREFERENCIA=${NUMEROREFERENCIA}`;

      console.log(queryConsulta); // Verificar la consulta generada

      // Ejecutar la consulta y devolver la respuesta
      const mensaje = await this.pqrService.updateCancelService(queryConsulta);
      return respuesta.status(HttpStatus.OK).json({ message: 'Respuesta actualizada exitosamente.', data: mensaje });
    } catch (error) {
      console.error('Error en la Actualizacion de la PQR:', error); // Log del error para más detalles

      // Mensaje detallado de error
      let mensajeError = 'Error en la Actualizacion de la PQR.';
      if (error.code === 'ORA-00001') {
        mensajeError += ' Violación de clave única: el código de PQR ya existe.';
      } else if (error.code === 'ORA-01400') {
        mensajeError += ' No se pueden insertar valores nulos en las columnas obligatorias.';
      } else if (error.code === 'ORA-00984') {
        mensajeError += ' Error en la sintaxis de la consulta. Revisa los datos ingresados.';
      } else if (error.code === 'ER_DUP_ENTRY') {
        mensajeError += ' El código de PQR ya existe.';
      } else if (error.code === 'ER_DATA_TOO_LONG') {
        mensajeError += ' Los datos proporcionados exceden la longitud permitida.';
      } else {
        mensajeError += ` Error inesperado: ${error.message || error}`;
      }
      return respuesta.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: mensajeError });
    }
  }

  /*
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pqrService.remove(+id);
  }*/

}
