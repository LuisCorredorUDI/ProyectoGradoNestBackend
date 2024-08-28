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
  ){}

  create(createUsuarioDto: CreateUsuarioDto) {
    return 'This action adds a new usuario';
  }

  async findAll() {
    return await this.usuarioRepository.find();
  }

  /*async findOne(id: number) {
    return await this.usuarioRepository.find();
  }*/

  async LoginUsuario(documento: string, clave: string): Promise<any> {
    // Consulta para verificar si existe el usuario y obtener su ID
    const queryText = 'SELECT ID FROM USUARIO WHERE DOCUMENTO = :documento AND CLAVEINGRESO = :clave';
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
    

  update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    return `This action updates a #${id} usuario`;
  }

  remove(id: number) {
    return `This action removes a #${id} usuario`;
  }
}
