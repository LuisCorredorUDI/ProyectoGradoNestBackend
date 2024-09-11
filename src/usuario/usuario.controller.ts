import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { BadRequestException, NotFoundException, InternalServerErrorException } from '@nestjs/common';

@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) { }

  @Get()
  findAll() {
    return this.usuarioService.findAll();
  }

  @Get('/DetalleUsuario/:id')
  findOne(@Param('id') id: number) {
    return this.usuarioService.findOne(id);
  }

  //controla el inicio de sesion de los usuarios
  @Get(':documento/:clave')
  LoginUsuario(@Param('documento') documento: string, @Param('clave') clave: string,) {
    return this.usuarioService.LoginUsuario(documento, clave);
  }

  //Crud
  @Post('/CrearUsuario')
  async create(@Body() createUsuarioDto: CreateUsuarioDto, @Res() respuesta) {
    try {
      const idMaximo = (await this.usuarioService.MaximoIdUsuario()) + 1;

      // Validación de FECHANACIMIENTO
      let fechaTexto = "NULL"; // Valor predeterminado para nulo
      if (createUsuarioDto.FECHANACIMIENTO) {
        fechaTexto = `TO_DATE('${createUsuarioDto.FECHANACIMIENTO}', 'YYYY-MM-DD')`;
      }

      // Validación de campos que pueden ser nulos
      const numeroTelefono = createUsuarioDto.NUMEROTELEFONO ? createUsuarioDto.NUMEROTELEFONO : "NULL";
      const numeroMovil = createUsuarioDto.NUMEROMOVIL ? createUsuarioDto.NUMEROMOVIL : "NULL";
      const correo = createUsuarioDto.CORREO ? `'${createUsuarioDto.CORREO}'` : "NULL";
      const direccion = createUsuarioDto.DIRECCION ? `'${createUsuarioDto.DIRECCION}'` : "NULL";

      // Construcción de la consulta como cadena
      const queryEnvia = `
        INSERT INTO USUARIO (
          ID, NOMBRES, APELLIDOS, DOCUMENTO, CLAVEINGRESO, FECHANACIMIENTO,
          NUMEROTELEFONO, NUMEROMOVIL, CORREO, DIRECCION, ESTADO, CODIGOTIPOUSUARIO
        ) VALUES (
          ${idMaximo}, '${createUsuarioDto.NOMBRES}', '${createUsuarioDto.APELLIDOS}', 
          '${createUsuarioDto.DOCUMENTO}', '${createUsuarioDto.CLAVEINGRESO}', ${fechaTexto}, 
          ${numeroTelefono}, ${numeroMovil}, ${correo}, ${direccion}, 
          ${createUsuarioDto.ESTADO}, ${createUsuarioDto.CODIGOTIPOUSUARIO}
        )
      `;

      console.log(queryEnvia); // Verificar la consulta generada

      // Ejecutar la consulta y devolver la respuesta
      const mensaje = await this.usuarioService.CrearUsuario(queryEnvia);
      return respuesta.status(HttpStatus.OK).json(mensaje);
    } catch (error) {
      console.error('Error en la creación del usuario:', error); // Log del error para más detalles

      // Mensaje detallado de error
      let mensajeError = 'Error en la creación del usuario.';
      if (error.code === 'ORA-00001') {
        mensajeError += ' Violación de clave única: el usuario ya existe.';
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

  @Patch('/ActualizarUsuario/:id')
  async update(
    @Param('id') id: string,
    @Body() updateUsuarioDto: UpdateUsuarioDto,
    @Res() respuesta
  ) {
    try {
      // Validación de FECHANACIMIENTO
      let fechaTexto = "NULL"; // Valor predeterminado para nulo
      if (updateUsuarioDto.FECHANACIMIENTO) {
        fechaTexto = `TO_DATE('${updateUsuarioDto.FECHANACIMIENTO}', 'YYYY-MM-DD')`;
      }

      // Validación de campos que pueden ser nulos
      const numeroTelefono = updateUsuarioDto.NUMEROTELEFONO ? updateUsuarioDto.NUMEROTELEFONO : "NULL";
      const numeroMovil = updateUsuarioDto.NUMEROMOVIL ? updateUsuarioDto.NUMEROMOVIL : "NULL";
      const correo = updateUsuarioDto.CORREO ? `'${updateUsuarioDto.CORREO}'` : "NULL";
      const direccion = updateUsuarioDto.DIRECCION ? `'${updateUsuarioDto.DIRECCION}'` : "NULL";

      // Construcción de la consulta como cadena
      const queryEnvia = `
        UPDATE USUARIO SET
          NOMBRES = '${updateUsuarioDto.NOMBRES}',
          APELLIDOS = '${updateUsuarioDto.APELLIDOS}',
          DOCUMENTO = '${updateUsuarioDto.DOCUMENTO}',
          CLAVEINGRESO = '${updateUsuarioDto.CLAVEINGRESO}',
          FECHANACIMIENTO = ${fechaTexto},
          NUMEROTELEFONO = ${numeroTelefono},
          NUMEROMOVIL = ${numeroMovil},
          CORREO = ${correo},
          DIRECCION = ${direccion},
          ESTADO = ${updateUsuarioDto.ESTADO},
          CODIGOTIPOUSUARIO = ${updateUsuarioDto.CODIGOTIPOUSUARIO}
        WHERE ID = ${id}
      `;

      console.log(queryEnvia); // Verificar la consulta generada

      // Ejecutar la consulta y devolver la respuesta
      const mensaje = await this.usuarioService.ActualizarUsuario(queryEnvia);
      return respuesta.status(HttpStatus.OK).json(mensaje);

    } catch (error) {
      console.error('Error en la actualización del usuario:', error); // Log del error para más detalles

      // Mensaje detallado de error
      let mensajeError = 'Error en la actualización del usuario.';
      if (error.code === 'ORA-01400') {
        mensajeError += ' No se pueden insertar valores nulos en las columnas obligatorias.';
      } else if (error.code === 'ORA-00984') {
        mensajeError += ' Error en la sintaxis de la consulta. Revisa los datos ingresados.';
      } else if (error.code === 'ORA-02290') {
        mensajeError += ' Violación de restricción de integridad. Verifica los valores de entrada.';
      } else {
        mensajeError += ` Error inesperado: ${error.message || error}`;
      }

      return respuesta.status(HttpStatus.INTERNAL_SERVER_ERROR).json(mensajeError);
    }
  }

  @Delete('/EliminarUsuario/:id')
  async remove(@Param('id') id: string, @Res() respuesta) {
    // Validar que 'id' sea un número válido
    const idNumber = parseInt(id, 10);
    if (isNaN(idNumber)) {
      throw new BadRequestException('El parámetro ID debe ser un número válido.');
    }
  
    try {
      // Construir la consulta usando parámetros para prevenir inyección SQL
      const queryEnvia = "DELETE FROM USUARIO WHERE ID = "+id;
      
      // Ejecutar la consulta
      const result = await this.usuarioService.EliminarUsuario(queryEnvia);
  
      // Comprobar si se eliminó alguna fila
      if (result.affected === 0) {
        throw new NotFoundException(`Usuario con ID ${idNumber} no encontrado.`);
      }
  
      // Devolver respuesta exitosa
      return respuesta.status(HttpStatus.OK).json({ message: 'Usuario eliminado exitosamente' });
    } catch (error) {
      console.error('Error en la eliminación del usuario:', error);
  
      // Determinar el tipo de error y devolver un mensaje adecuado
      if (error instanceof NotFoundException) {
        return respuesta.status(HttpStatus.NOT_FOUND).json({ message: error.message });
      } else if (error instanceof BadRequestException) {
        return respuesta.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
      } else {
        return respuesta.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error inesperado en la eliminación del usuario', error: error.message });
      }
    }
  }
  

}
