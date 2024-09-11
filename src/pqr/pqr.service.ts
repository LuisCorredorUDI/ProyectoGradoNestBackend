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
    const resultado = await this.pqrRepository.query('SELECT NVL(MAX(CODIGO),0) AS NUEVO FROM PQR');
    return resultado[0]?.NUEVO || 0;
  }

  findAll() {
    return `This action returns all pqr`;
  }

  findOne(id: number) {
    return `This action returns a #${id} pqr`;
  }

  async create(queryConsulta: string) {
    try {
      // Usa el método `query` de TypeORM con la consulta y los parámetros
      return await this.pqrRepository.query(queryConsulta);
    } catch (error) {
      // Manejo de errores si falla la ejecución de la consulta
      throw new InternalServerErrorException('Error ejecutando la consulta SQL', error.message);
    }
  }

  /*
  update(id: number, updatePqrDto: UpdatePqrDto) {
    return `This action updates a #${id} pqr`;
  }*/

  remove(id: number) {
    return `This action removes a #${id} pqr`;
  }
}
