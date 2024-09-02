import { Injectable } from '@nestjs/common';
import { CreateEventoDto } from './dto/create-evento.dto';
import { UpdateEventoDto } from './dto/update-evento.dto';
import { Evento } from './entities/evento.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class EventoService {

  constructor(
    @InjectRepository(Evento)
    private readonly eventoRepository: Repository<Evento>
  ) {}

  //funcion para buscar el ID maximo para crear un usuario
  async MaximoIdEvento(): Promise<number>{
    const resultado = await this.eventoRepository.query('SELECT NVL(MAX(CODIGO),0) AS NUEVO FROM EVENTO');
    return resultado[0]?.NUEVO || 0;
  }

  async findAll() {
    return await this.eventoRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} evento`;
  }

  //crud
  async CrearEvento(consulta: string) {
    return this.eventoRepository.query(consulta);
  }

  async ActualizarEvento(consulta: string) {
    return this.eventoRepository.query(consulta);
  }

  async EliminarEvento(consulta: string) {
    return this.eventoRepository.query(consulta);
  }
}
