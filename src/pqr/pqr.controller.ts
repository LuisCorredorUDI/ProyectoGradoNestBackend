import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException, InternalServerErrorException, HttpStatus, Res } from '@nestjs/common';
import { PqrService } from './pqr.service';
import { CreatePqrDto } from './dto/create-pqr.dto';
import { UpdatePqrDto } from './dto/update-pqr.dto';

@Controller('pqr')
export class PqrController {
  constructor(private readonly pqrService: PqrService) {}

  @Get()
  findAll() {
    return this.pqrService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pqrService.findOne(+id);
  }

  @Post()
  async create(@Body() createPqrDto: CreatePqrDto, @Res() respuesta) {
    try {
      // Obtener el máximo código de PQR y sumarle 1
      const codigoNuevaPqr = (await this.pqrService.MaximoCodigoPqr()) + 1;
  
      // Generar la consulta SQL parametrizada
      const queryConsulta = `INSERT INTO PQR (CODIGO, DETALLE, TIPOPQR, USUARIOGENERA, CODIGODERECHO, NUMEROREFERENCIA) 
      VALUES (${codigoNuevaPqr}, '${createPqrDto.DETALLE}', ${createPqrDto.TIPOPQR}, ${createPqrDto.USUARIOGENERA}, ${createPqrDto.CODIGODERECHO}, ${codigoNuevaPqr + 1000})`;
  
      console.log(queryConsulta); // Verificar la consulta generada
  
      // Ejecutar la consulta y devolver la respuesta
      const mensaje = await this.pqrService.create(queryConsulta);
      return respuesta.status(HttpStatus.CREATED).json({ message: 'PQR creada exitosamente.', data: mensaje });
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
  

  /*
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePqrDto: UpdatePqrDto) {
    return this.pqrService.update(+id, updatePqrDto);
  }*/

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pqrService.remove(+id);
  }
}
