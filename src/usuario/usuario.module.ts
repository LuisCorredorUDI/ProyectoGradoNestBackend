import { Module } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';
import { FuncionesGlobalesModule } from 'src/funciones-globales/funciones-globales.module';

@Module({
  imports: [FuncionesGlobalesModule],
  controllers: [UsuarioController],
  providers: [UsuarioService],
})
export class UsuarioModule {}
