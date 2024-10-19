import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity('CITACION')
export class Citacion {

    @PrimaryColumn({ name: 'CODIGO' })
    CODIGO: number;

    @Column({ name: 'DETALLE' })
    DETALLE: string;

    @Column({ name: 'FECHAINICIO' })
    FECHAINICIO: Date;

    @Column({ name: 'FECHAFIN' })
    FECHAFIN: Date;

    @Column({ name: 'USUARIOCITACION' })
    USUARIOCITACION: number;

}
