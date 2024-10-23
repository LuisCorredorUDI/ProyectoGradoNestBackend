import { Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsuarioService {

  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>
  ) { }

  //Metodo para obtener tokends de usuarios
  async consultaToken(consulta: string) {
    return this.usuarioRepository.query(consulta);
  }

  //funcion para buscar el ID maximo para crear un usuario
  async MaximoIdUsuario(): Promise<number> {
    const resultado = await this.usuarioRepository.query('SELECT NVL(MAX(ID),0) AS NUEVO FROM USUARIO');
    return resultado[0]?.NUEVO || 0;
  }

  //funcion para buscar el ID maximo para crear un acudiente
  async MaximoIdAcudiente(): Promise<number> {
    const resultado = await this.usuarioRepository.query('SELECT NVL(MAX(ID),0) AS NUEVO FROM ACUDIENTE');
    return resultado[0]?.NUEVO || 0;
  }

  async ListadoPorVincularService(consulta: string) {
    return this.usuarioRepository.query(consulta);
  }

  async ListadoVinculadosService(consulta: string) {
    return this.usuarioRepository.query(consulta);
  }

  async findAll() {
    return await this.usuarioRepository.find({order:{NOMBRES: 'ASC'}});
  }

  async findOne(id: number) {
    try {
      // Si el ID existe, buscar el usuario completo usando findOne
      const usuario = await this.usuarioRepository.findOne({ where: { ID: id } });

      // Verificar si el usuario fue encontrado y retornarlo completo
      if (usuario) {
        return usuario; // Retorna el objeto completo del usuario encontrado
      } else {
        return null; // Si no se encontró el usuario por alguna razón
      }
    } catch (error) {
      console.error('Error al ejecutar la consulta:', error);
      throw new Error('Error en la autenticación');
    }
  }

  async LoginUsuario(documento: string, clave: string): Promise<any> {
    // Consulta para verificar si existe el usuario y obtener su ID
    const queryText = 'SELECT ID FROM USUARIO WHERE DOCUMENTO = :documento AND CLAVEINGRESO = :clave AND ESTADO=1 ';
    try {
      // Ejecutar la consulta personalizada con parámetros para evitar SQL Injection
      const resultado = await this.usuarioRepository.query(queryText, [documento, clave]);

      // Verificar si se obtuvo algún resultado
      if (resultado.length === 0) {
        return null; // No se encontró ningún usuario
      }

      // Extraer el ID del resultado
      const usuarioId = resultado[0]?.ID;

      // Si el ID existe, buscar el usuario completo usando findOne
      const usuario = await this.usuarioRepository.findOne({ where: { ID: usuarioId } });

      // Verificar si el usuario fue encontrado y retornarlo completo
      if (usuario) {
        return usuario; // Retorna el objeto completo del usuario encontrado
      } else {
        return null; // Si no se encontró el usuario por alguna razón
      }
    } catch (error) {
      console.error('Error al ejecutar la consulta:', error);
      throw new Error('Error en la autenticación');
    }
  }

  //CRUD
  async CrearAcudiente(consulta: string) {
    return this.usuarioRepository.query(consulta);
  }

  async CrearUsuario(consulta: string) {
    return this.usuarioRepository.query(consulta);
  }

  async ActualizarUsuario(consulta: string) {
    return this.usuarioRepository.query(consulta);
  }

  async EliminarUsuario(consulta: string) {
    return this.usuarioRepository.query(consulta);
  }

  async DesvincularAcudienteService(consulta: string) {
    return this.usuarioRepository.query(consulta);
  }

}
