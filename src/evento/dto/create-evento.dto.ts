import { IsNotEmpty, IsOptional } from 'class-validator';


export class CreateEventoDto {
    NOMBRE: string;
    DETALLE: string;
    FECHAINICIO: string;
    FECHAFIN: string;
    IMAGEN?: string;
    IDUSUARIOCREACION: number;
}


