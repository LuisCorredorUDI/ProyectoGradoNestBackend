import { Binary } from "typeorm";

export class CreateEventoDto {
    CODIGO : number;
    NOMBRE : string;
    DETALLE : string;
    FECHAINICIO : Date;
    FECHAFIN : Date;
    IMAGEN : Binary;
}
