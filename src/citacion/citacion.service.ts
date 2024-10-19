import { Injectable } from '@nestjs/common';
import { CreateCitacionDto } from './dto/create-citacion.dto';
import { UpdateCitacionDto } from './dto/update-citacion.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Citacion } from './entities/citacion.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CitacionService {
  constructor(
    @InjectRepository(Citacion)
    private readonly citacionRepository: Repository<Citacion>
  ) { }

    //funcion para buscar el ID maximo para crear un usuario
    async MaximoCodigoCitacion(): Promise<number> {
      const resultado = await this.citacionRepository.query('SELECT NVL(MAX(CODIGO),0) AS NUEVO FROM CITACION');
      return resultado[0]?.NUEVO || 0;
    }

  //funcion para buscar el ID maximo para crear un usuario
  async MaximoIntermedia(): Promise<number> {
    const resultado = await this.citacionRepository.query('SELECT NVL(MAX(CODIGOCITACIONOBSERVADOR),0) AS NUEVO FROM CITACION_OBSERVADOR');
    return resultado[0]?.NUEVO || 0;
  }

  ListadoCitacionesService(consulta: string) {
    return this.citacionRepository.query(consulta);
  }

  CrearCitacionService(consulta: string) {
    return this.citacionRepository.query(consulta);
  }

  CrearIntermedia(consulta: string) {
    return this.citacionRepository.query(consulta);
  }

  EliminarCitacionService(consulta: string) {
    return this.citacionRepository.query(consulta);
  }
}
