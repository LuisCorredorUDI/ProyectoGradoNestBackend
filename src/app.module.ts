import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './usuario/entities/usuario.entity';
import { UsuarioController } from './usuario/usuario.controller';
import { UsuarioService } from './usuario/usuario.service';
import { Evento } from './evento/entities/evento.entity';
import { EventoController } from './evento/evento.controller';
import { EventoService } from './evento/evento.service';
import { Pqr } from './pqr/entities/pqr.entity';
import { PqrController } from './pqr/pqr.controller';
import { PqrService } from './pqr/pqr.service';
import { Derecho } from './derecho/entities/derecho.entity';
import { DerechoController } from './derecho/derecho.controller';
import { DerechoService } from './derecho/derecho.service';


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
    TypeOrmModule.forFeature([Evento]),
    TypeOrmModule.forFeature([Pqr]),
    TypeOrmModule.forFeature([Derecho])
  ],
  controllers: [AppController, UsuarioController, EventoController, PqrController, DerechoController],
  providers: [AppService, UsuarioService, EventoService, PqrService, DerechoService],
})
export class AppModule {}
