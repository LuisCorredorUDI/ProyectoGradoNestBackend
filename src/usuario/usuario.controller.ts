import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Get()
  findAll() {
    return this.usuarioService.findAll();
  }

  //controla el inicio de sesion de los usuarios
  @Get(':documento/:clave')
  LoginUsuario(@Param('documento') documento: string, @Param('clave') clave: string,) 
  {
    return this.usuarioService.LoginUsuario(documento, clave);
  }

  //Crud
  @Post('/CrearUsuario')
  async create(@Body() createUsuarioDto: CreateUsuarioDto, @Res() respuesta) {
    const idMaximo = await this.usuarioService.MaximoIdUsuario()+1;
    //Armamos consulta
    const queryEnvia = "INSERT INTO USUARIO VALUES("+idMaximo+",'"+createUsuarioDto.NOMBRES+"','"+createUsuarioDto.APELLIDOS+"','"+createUsuarioDto.DOCUMENTO+"', '"+createUsuarioDto.CLAVEINGRESO+"', null, "+createUsuarioDto.NUMEROTELEFONO+", "+createUsuarioDto.NUMEROMOVIL+", '"+createUsuarioDto.CORREO+"', '"+createUsuarioDto.DIRECCION+"', "+createUsuarioDto.ESTADO+", "+createUsuarioDto.CODIGOTIPOUSUARIO+") ";
    //console.log(queryEnvia);
    return this.usuarioService.CrearUsuario(queryEnvia)
    .then(mensaje => { respuesta.status(HttpStatus.OK).json(mensaje) })
    .catch(() => { respuesta.status(HttpStatus.FORBIDDEN).json('Error en la creación')});
  }

  @Patch('/ActualizarUsuario/:id')
  update(@Param('id') id: string, @Body() updateUsuarioDto: UpdateUsuarioDto, @Res() respuesta) {
    const queryEnvia = "UPDATE USUARIO SET NOMBRES='"+updateUsuarioDto.NOMBRES+"', APELLIDOS='"+updateUsuarioDto.APELLIDOS+"', DOCUMENTO='"+updateUsuarioDto.DOCUMENTO+"', CLAVEINGRESO='"+updateUsuarioDto.CLAVEINGRESO+"', NUMEROTELEFONO="+updateUsuarioDto.NUMEROTELEFONO+", NUMEROMOVIL="+updateUsuarioDto.NUMEROMOVIL+", CORREO='"+updateUsuarioDto.CORREO+"', DIRECCION='"+updateUsuarioDto.DIRECCION+"', ESTADO="+updateUsuarioDto.ESTADO+", CODIGOTIPOUSUARIO="+updateUsuarioDto.CODIGOTIPOUSUARIO+" WHERE ID="+id+" ";
    //console.log(queryEnvia);
    return this.usuarioService.ActualizarUsuario(queryEnvia)
    .then(mensaje => { respuesta.status(HttpStatus.OK).json(mensaje) })
    .catch(() => { respuesta.status(HttpStatus.FORBIDDEN).json('Error en la edición') });
  }

  @Delete('/EliminarUsuario/:id')
  remove(@Param('id') id: string, @Res() respuesta) {
    const queryEnvia = "DELETE FROM USUARIO WHERE ID="+id;
    //console.log(queryEnvia);
    return this.usuarioService.EliminarUsuario(queryEnvia)
    .then(mensaje => { respuesta.status(HttpStatus.OK).json(mensaje) })
    .catch(() => { respuesta.status(HttpStatus.FORBIDDEN).json('Error en la eliminación') });
  }

}
