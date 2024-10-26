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
      const resultado = await this.observadorRepository.query('SELECT IFNULL(MAX(CODIGO),0)+1 AS NUEVO FROM OBSERVADOR');
      return resultado[0]?.NUEVO || 0;
    }

  CrearObservacion(consulta: string) {
    return this.observadorRepository.query(consulta);
  }
}
