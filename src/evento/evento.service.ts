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

  create(createEventoDto: CreateEventoDto) {
    return 'This action adds a new evento';
  }

  async findAll() {
    return await this.eventoRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} evento`;
  }

  update(id: number, updateEventoDto: UpdateEventoDto) {
    return `This action updates a #${id} evento`;
  }

  remove(id: number) {
    return `This action removes a #${id} evento`;
  }
}
