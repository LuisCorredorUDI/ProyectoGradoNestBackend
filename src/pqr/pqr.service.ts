import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreatePqrDto } from './dto/create-pqr.dto';
import { UpdatePqrDto } from './dto/update-pqr.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Pqr } from './entities/pqr.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PqrService {

  constructor(
    @InjectRepository(Pqr)
    private readonly pqrRepository: Repository<Pqr>
  ) { }

  //funcion para buscar el ID maximo para crear un usuario
  async MaximoCodigoPqr(): Promise<number> {
    const resultado = await this.pqrRepository.query('SELECT IFNULL(MAX(CODIGO),0)+1 AS NUEVO FROM PQR');
    return resultado[0]?.NUEVO || 0;
  }

  //Listado pqr por usuario especifico
  async BusquedaPqrPorUsuario(queryConsulta: string) {
    try {
      // Ejecutar la consulta con los parámetros para evitar inyección SQL
      const pqrList = await this.pqrRepository.query(queryConsulta);
      return pqrList;
    } catch (error) {
      console.error('Error al ejecutar la consulta de PQR por usuario:', error); // Log del error

      // Lanzar una excepción con un mensaje de error específico
      throw new InternalServerErrorException('Error ejecutando la consulta SQL para buscar PQR por usuario.', error.message);
    }
  }

  //Listado pqr por usuario especifico
  async BusquedaPqrPorCoordinador(queryConsulta: string) {
    try {
      // Ejecutar la consulta con los parámetros para evitar inyección SQL
      const pqrList = await this.pqrRepository.query(queryConsulta);
      return pqrList;
    } catch (error) {
      console.error('Error al ejecutar la consulta de PQR por usuario:', error); // Log del error

      // Lanzar una excepción con un mensaje de error específico
      throw new InternalServerErrorException('Error ejecutando la consulta SQL para buscar PQR por usuario.', error.message);
    }
  }

  //DETALLE
  //DETALLE pqr por coordinador
  async BusquedaDetalleService(queryConsulta: string) {
    try {
      // Ejecutar la consulta con los parámetros para evitar inyección SQL
      const pqrDetalle = await this.pqrRepository.query(queryConsulta);
      return pqrDetalle;
    } catch (error) {
      console.error('Error al ejecutar la consulta de PQR por usuario:', error); // Log del error

      // Lanzar una excepción con un mensaje de error específico
      throw new InternalServerErrorException('Error ejecutando la consulta SQL para buscar PQR por usuario.', error.message);
    }
  }

  //CRUD
  async create(queryConsulta: string) {
    try {
      // Usa el método `query` de TypeORM con la consulta y los parámetros
      return await this.pqrRepository.query(queryConsulta);
    } catch (error) {
      // Manejo de errores si falla la ejecución de la consulta
      throw new InternalServerErrorException('Error ejecutando la consulta SQL', error.message);
    }
  }

  async updateRespuestaService(queryConsulta: string) {
    try {
      // Usa el método `query` de TypeORM con la consulta y los parámetros
      return await this.pqrRepository.query(queryConsulta);
    } catch (error) {
      // Manejo de errores si falla la ejecución de la consulta
      throw new InternalServerErrorException('Error ejecutando la consulta SQL', error.message);
    }
  }

  async updateCancelService(queryConsulta: string) {
    try {
      // Usa el método `query` de TypeORM con la consulta y los parámetros
      return await this.pqrRepository.query(queryConsulta);
    } catch (error) {
      // Manejo de errores si falla la ejecución de la consulta
      throw new InternalServerErrorException('Error ejecutando la consulta SQL', error.message);
    }
  }


}
