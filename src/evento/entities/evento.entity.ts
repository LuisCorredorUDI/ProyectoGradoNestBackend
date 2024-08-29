import { Column, Entity, PrimaryColumn } from "typeorm"

@Entity('EVENTO')
export class Evento {
    @PrimaryColumn({ name: 'CODIGO' })
    CODIGO: number;

    @Column({ name: 'NOMBRE' })
    NOMBRE: string;

    @Column({ name: 'DETALLE' })
    DETALLE: string;

    @Column({ name: 'FECHAINICIO' })
    FECHAINICIO: Date;

    @Column({ name: 'FECHAFIN' })
    FECHAFIN: Date;

    @Column({ name: 'IMAGEN' })
    IMAGEN: Buffer;
}
