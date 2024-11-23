
import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity('DEBER')
export class Deber {
    @PrimaryColumn({ name: 'CODIGO' })
    CODIGO: number;

    @Column({ name: 'DETALLE' })
    DETALLE: string;
}