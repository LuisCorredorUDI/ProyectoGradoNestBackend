import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateDerechoDto } from './dto/create-derecho.dto';
import { UpdateDerechoDto } from './dto/update-derecho.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Derecho } from './entities/derecho.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DerechoService {

  constructor(
    @InjectRepository(Derecho)
    private readonly derechoRepository: Repository<Derecho>
  ) { }

  findAll() {
    return this.derechoRepository.find();
  }

    //funcion para buscar el ID maximo para crear un usuario
    async MaximoCodigoDerecho(): Promise<number> {
      const resultado = await this.derechoRepository.query('SELECT IFNULL(MAX(CODIGO), 0)+1 AS NUEVO FROM DERECHO');
      return resultado[0]?.NUEVO || 0;
    }

  //para filtrar los derechos segun el tipo de usuario
  async BuscarPorTipo(queryConsultaTipoUsuario: string) {
    try {
      // Ejecutar la consulta con los parámetros
      const derechos = await this.derechoRepository.query(queryConsultaTipoUsuario);
      return derechos;
    } catch (error) {
      console.error('Error al ejecutar la consulta de derechos por tipo de usuario:', error);
      throw new InternalServerErrorException('Error al ejecutar la consulta de derechos por tipo de usuario.');
    }
  }

  async BuscarDetalleServices(queryConsultaTipoUsuario: string) {
    try {
      // Ejecutar la consulta con los parámetros
      const derechos = await this.derechoRepository.query(queryConsultaTipoUsuario);
      return derechos;
    } catch (error) {
      console.error('Error al ejecutar la consulta de derechos por tipo de usuario:', error);
      throw new InternalServerErrorException('Error al ejecutar la consulta de derechos por tipo de usuario.');
    }
  }

  //CRUD
  async CrearDerechoService(queryConsultaTipoUsuario: string) {
    try {
      // Ejecutar la consulta con los parámetros
      return this.derechoRepository.query(queryConsultaTipoUsuario);
    } catch (error) {
      console.error('Error al ejecutar la consulta:', error);
      throw new InternalServerErrorException('Error al ejecutar la consulta');
    }
  }

  async ActualizarDerechoService(queryConsultaTipoUsuario: string) {
    try {
      // Ejecutar la consulta con los parámetros
      return this.derechoRepository.query(queryConsultaTipoUsuario);
    } catch (error) {
      console.error('Error al ejecutar la consulta:', error);
      throw new InternalServerErrorException('Error al ejecutar la consulta');
    }
  }

}
