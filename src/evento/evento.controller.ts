import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, UseInterceptors, UploadedFile } from '@nestjs/common';
import { EventoService } from './evento.service';
import { CreateEventoDto } from './dto/create-evento.dto';
import { UpdateEventoDto } from './dto/update-evento.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import * as path from 'path';
import * as fs from 'fs';



@Controller('evento')
export class EventoController {
  constructor(private readonly eventoService: EventoService) { }

  // Listado de eventos para la gestión del coordinador
  @Get('/listaHome')
  async listadoEventosHomeControlador(@Res() respuesta) {
    const consulta = `SELECT CODIGO, NOMBRE, DETALLE, FECHAINICIO, FECHAFIN, IDUSUARIOCREACION, RUTAIMAGEN
                      FROM EVENTO 
                      WHERE FECHAINICIO > SYSDATE AND FECHAFIN > SYSDATE 
                      ORDER BY FECHAINICIO ASC`;

    const eventos = await this.eventoService.listadoEventosHomeService(consulta);

    const rutaPorDefecto = path.join(__dirname, '..', 'evento\\rutatemporal', `defaultEvent.png`);

    // Procesamos cada evento para verificar la existencia de la imagen
    const eventosConImagen = eventos.map((evento) => {
      const rutaImagen = evento.RUTAIMAGEN;

      // Verificamos si la imagen existe o si usamos la imagen por defecto
      let imagenPath = rutaPorDefecto; // Por defecto
      if (rutaImagen && fs.existsSync(rutaImagen)) {
        imagenPath = rutaImagen; // Si la imagen existe, usamos esa
      }

      // Leemos la imagen y la convertimos en base64 para incluirla en el JSON
      const imagenBuffer = fs.readFileSync(imagenPath);
      const imagenBase64 = imagenBuffer.toString('base64');

      // Devolvemos el evento con el campo "IMAGENARCHIVO"
      return {
        ...evento,
        IMAGENARCHIVO: imagenBase64, // Agregamos el campo con la imagen en base64
      };
    });

    // Devolvemos la lista de eventos con el nuevo campo IMAGENARCHIVO
    return respuesta.status(200).json(eventosConImagen);
  }

  //Listado de eventos para la gestion del cooordinador
  @Get('/listaCoordinador')
  listadoEventosCoordinadorControlador() {
    const consulta = "SELECT CODIGO, NOMBRE, FECHAINICIO FROM EVENTO ORDER BY FECHAINICIO DESC";
    return this.eventoService.listadoEventosCoordinadorService(consulta);
  }


  //crud
  @Post('/CrearEvento')
  async create(@Body() createEventoDto: CreateEventoDto, @Res() respuesta) {
    try {
      const idMaximo = await this.eventoService.MaximoIdEvento() + 1;

      let rutaImagen = null;
      if (createEventoDto.IMAGEN) {
        // Generar la ruta para guardar la imagen
        rutaImagen = path.join(__dirname, '..', 'evento\\rutatemporal', `Evento${idMaximo}.jpg`);

        // Decodificar la imagen de base64 y guardarla en la carpeta "rutatemporal"
        const imagenBuffer = Buffer.from(createEventoDto.IMAGEN, 'base64');
        fs.writeFileSync(rutaImagen, imagenBuffer);
      }

      // Armamos consulta con todos los campos necesarios
      const queryEnvia =
        ` INSERT INTO EVENTO (CODIGO, NOMBRE, DETALLE, FECHAINICIO, FECHAFIN, RUTAIMAGEN, IDUSUARIOCREACION)
        VALUES (${idMaximo}, '${createEventoDto.NOMBRE}', '${createEventoDto.DETALLE}', 
        TO_DATE('${createEventoDto.FECHAINICIO}', 'YYYY/MM/DD HH24:MI'), 
        TO_DATE('${createEventoDto.FECHAFIN}', 'YYYY/MM/DD HH24:MI'), 
        '${rutaImagen}', ${createEventoDto.IDUSUARIOCREACION}) `;

      console.log(queryEnvia);

      const mensaje = await this.eventoService.CrearEvento(queryEnvia);
      return respuesta.status(HttpStatus.OK).json(mensaje);
    } catch (error) {
      console.error('Error en la creación del evento:', error);
      return respuesta.status(HttpStatus.INTERNAL_SERVER_ERROR).json('Error en la creación');
    }
  }

  @Delete('/EliminarEvento/:id')
  remove(@Param('id') id: string, @Res() respuesta) {
    //Armamos consulta
    const queryEnvia = "DELETE FROM EVENTO WHERE CODIGO=" + id;

    // Generar la ruta para guardar la imagen
    let rutaImagen = null;
    rutaImagen = path.join(__dirname, '..', 'evento\\rutatemporal', `Evento${id}.jpg`);
    if (fs.existsSync(rutaImagen)) {
      try {
        fs.unlinkSync(rutaImagen); // Borrar el archivo
        console.log('Imagen borrada exitosamente');
      } catch (error) {
        console.error('Error al borrar la imagen:', error);
      }
    } else {
      console.log('La imagen no existe');
    }

    console.log(queryEnvia);
    return this.eventoService.EliminarEvento(queryEnvia)
      .then(mensaje => { respuesta.status(HttpStatus.OK).json(mensaje) })
      .catch(() => { respuesta.status(HttpStatus.FORBIDDEN).json('Error en la eliminación') });
  }
}
