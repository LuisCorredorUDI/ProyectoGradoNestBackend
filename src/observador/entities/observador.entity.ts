import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity('OBSERVADOR')
export class Observador {
    @PrimaryColumn({ name: 'CODIGO' })
    CODIGO: number;

    @Column({ name: 'TITULO' })
    TITULO: string;

    @Column({ name: 'DETALLE' })
    DETALLE: string;

    @Column({ name: 'USUARIOOBSERVACION' })
    USUARIOOBSERVACION: number;
}
