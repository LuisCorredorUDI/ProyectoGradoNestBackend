import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity('DERECHO')
export class Derecho {
    @PrimaryColumn({ name: 'CODIGO' })
    CODIGO: number;

    @Column({ name: 'DETALLE' })
    DETALLE: string;

    @Column({ name: 'TIPOUSUARIO' })
    TIPOUSUARIO: number;
}
