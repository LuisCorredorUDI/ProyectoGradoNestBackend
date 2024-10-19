import { Injectable } from '@nestjs/common';
import { CreateObservadorDto } from './dto/create-observador.dto';
import { UpdateObservadorDto } from './dto/update-observador.dto';
import { Observador } from './entities/observador.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ObservadorService {

  constructor(
    @InjectRepository(Observador)
    private readonly observadorRepository: Repository<Observador>
  ) { }

    //funcion para buscar el ID maximo para crear un usuario
    async MaximoCodigoObservador(): Promise<number> {
      const resultado = await this.observadorRepository.query('SELECT NVL(MAX(CODIGO),0) AS NUEVO FROM OBSERVADOR');
      return resultado[0]?.NUEVO || 0;
    }

  findAll() {
    return `This action returns all observador`;
  }

  findOne(id: number) {
    return `This action returns a #${id} observador`;
  }

  CrearObservacion(consulta: string) {
    return this.observadorRepository.query(consulta);
  }

  update(id: number, updateObservadorDto: UpdateObservadorDto) {
    return `This action updates a #${id} observador`;
  }

  remove(id: number) {
    return `This action removes a #${id} observador`;
  }
}
