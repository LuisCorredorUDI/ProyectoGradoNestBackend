import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FuncionesGlobale } from './entities/funciones-globale.entity';


@Injectable()
export class FuncionesGlobalesService {

  constructor(
    @InjectRepository(FuncionesGlobale)
    private readonly funcionesGlobalesRepository: Repository<FuncionesGlobale> 
  ){}

  async BuscarMaximoTabla(NombreTabla: string): Promise<number> {
      const queryText = 'SELECT NVL(MAX(ID),0) as MAXID FROM '+NombreTabla;
      // Ejecuta la consulta personalizada
      const resultado = await this.funcionesGlobalesRepository.query(queryText);
      // Retorna el valor obtenido (asegurándote de que resultado[0] contenga el valor esperado)
      return resultado[0]?.MAXID || 0;
    }
}
