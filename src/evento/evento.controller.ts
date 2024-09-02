import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus } from '@nestjs/common';
import { EventoService } from './evento.service';
import { CreateEventoDto } from './dto/create-evento.dto';
import { UpdateEventoDto } from './dto/update-evento.dto';



@Controller('evento')
export class EventoController {
  constructor(private readonly eventoService: EventoService) {}



  @Get()
  findAll() {
    return this.eventoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventoService.findOne(+id);
  }

  //crud

  @Post('/CrearEvento')
  async create(@Body() createEventoDto: CreateEventoDto, @Res() respuesta) {
    const idMaximo = await this.eventoService.MaximoIdEvento()+1;
    //Armamos consulta
    const queryEnvia = "INSERT INTO EVENTO VALUES("+idMaximo+",'"+createEventoDto.NOMBRE+"','"+createEventoDto.DETALLE+"', null, null, null) ";
    //console.log(queryEnvia);
    return this.eventoService.CrearEvento(queryEnvia)
    .then(mensaje => { respuesta.status(HttpStatus.OK).json(mensaje) })
    .catch(() => { respuesta.status(HttpStatus.FORBIDDEN).json('Error en la creación')});
  }

  @Patch('/ActualizarEvento/:id')
  async update(@Param('id') id: string, @Body() updateEventoDto: UpdateEventoDto, @Res() respuesta) {
    //Armamos consulta
    const queryEnvia = "UPDATE EVENTO SET NOMBRE='"+updateEventoDto.NOMBRE+"', DETALLE='"+updateEventoDto.DETALLE+"' WHERE CODIGO="+id;
    //console.log(queryEnvia);
    return this.eventoService.ActualizarEvento(queryEnvia)
    .then(mensaje => { respuesta.status(HttpStatus.OK).json(mensaje) })
    .catch(() => { respuesta.status(HttpStatus.FORBIDDEN).json('Error en la edición')});
  }

  @Delete('/EliminarEvento/:id')
  remove(@Param('id') id: string, @Res() respuesta) {
    //Armamos consulta
    const queryEnvia = "DELETE FROM EVENTO WHERE CODIGO="+id;
    //console.log(queryEnvia);
    return this.eventoService.EliminarEvento(queryEnvia)
    .then(mensaje => { respuesta.status(HttpStatus.OK).json(mensaje) })
    .catch(() => { respuesta.status(HttpStatus.FORBIDDEN).json('Error en la eliminación')});
  }
}
