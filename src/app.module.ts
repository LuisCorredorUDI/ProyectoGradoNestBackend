import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioController } from './usuario/usuario.controller';
import { UsuarioService } from './usuario/usuario.service';
import { Usuario } from './usuario/entities/usuario.entity';
import { FuncionesGlobale } from './funciones-globales/entities/funciones-globale.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'oracle',
      host: 'localhost',             // Dirección del servidor Oracle
      port: 1521,                    // Puerto por defecto de Oracle
      username: 'PROYECTOGRADO',     // Usuario de la base de datos
      password: 'Bucaramanga2024',     // Contraseña del usuario
      sid: 'xe',               // SID de la base de datos Oracle (por ejemplo, ORCL)
      entities: [__dirname + '/**/*.entity{.ts,.js}'], // Entidades
      synchronize: false,             // No recomendado en producción, genera automáticamente las tablas
    }),
    TypeOrmModule.forFeature([Usuario]),
    TypeOrmModule.forFeature([FuncionesGlobale]),
  ],
  controllers: [AppController, UsuarioController],
  providers: [AppService, UsuarioService],
})
export class AppModule {}
