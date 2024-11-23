import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateDeberDto } from './dto/create-deber.dto';
import { UpdateDeberDto } from './dto/update-deber.dto';
import { Deber } from './entities/deber.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class DeberService {
  //REPOSITORIO
  constructor(
    @InjectRepository(Deber)
    private readonly deberRepository: Repository<Deber>
  ) { }

    //funcion para buscar el ID maximo para crear un usuario
    async MaximoCodigodeber(): Promise<number> {
      const resultado = await this.deberRepository.query('SELECT IFNULL(MAX(CODIGO), 0)+1 AS NUEVO FROM DEBER');
      return resultado[0]?.NUEVO || 0;
    }

  //para LISTAR los deBERES
  async BuscarDeberesServices(queryConsultaTipoUsuario: string) {
    try {
      // Ejecutar la consulta con los parámetros
      const debers = await this.deberRepository.query(queryConsultaTipoUsuario);
      return debers;
    } catch (error) {
      console.error('Error al ejecutar la consulta de deberes de usuario:', error);
      throw new InternalServerErrorException('Error al ejecutar la consulta de deberes de usuario.');
    }
  }

  async BuscarDetalleServices(queryConsultaTipoUsuario: string) {
    try {
      // Ejecutar la consulta con los parámetros
      const debers = await this.deberRepository.query(queryConsultaTipoUsuario);
      return debers;
    } catch (error) {
      console.error('Error al ejecutar la consulta de debers por tipo de usuario:', error);
      throw new InternalServerErrorException('Error al ejecutar la consulta de debers por tipo de usuario.');
    }
  }

  //CRUD
  async CreardeberService(queryConsultaTipoUsuario: string) {
    try {
      // Ejecutar la consulta con los parámetros
      return this.deberRepository.query(queryConsultaTipoUsuario);
    } catch (error) {
      console.error('Error al ejecutar la consulta:', error);
      throw new InternalServerErrorException('Error al ejecutar la consulta');
    }
  }

  async ActualizardeberService(queryConsultaTipoUsuario: string) {
    try {
      // Ejecutar la consulta con los parámetros
      return this.deberRepository.query(queryConsultaTipoUsuario);
    } catch (error) {
      console.error('Error al ejecutar la consulta:', error);
      throw new InternalServerErrorException('Error al ejecutar la consulta');
    }
  }


}
