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

  //para filtrar los derechos segun el tipo de usuario
  async BuscarPorTipo(queryConsultaTipoUsuario: string, parametros: any) {
    try {
      // Ejecutar la consulta con los parámetros
      const derechos = await this.derechoRepository.query(queryConsultaTipoUsuario, parametros);
      return derechos;
    } catch (error) {
      console.error('Error al ejecutar la consulta de derechos por tipo de usuario:', error);
      throw new InternalServerErrorException('Error al ejecutar la consulta de derechos por tipo de usuario.');
    }
  }


  /*
  //crud
  create(createDerechoDto: CreateDerechoDto) {
    return 'This action adds a new derecho';
  }

  update(id: number, updateDerechoDto: UpdateDerechoDto) {
    return `This action updates a #${id} derecho`;
  }

  remove(id: number) {
    return `This action removes a #${id} derecho`;
  }*/


}
