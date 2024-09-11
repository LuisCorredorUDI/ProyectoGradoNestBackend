import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity('PQR')
export class Pqr {

    @PrimaryColumn({ name: 'CODIGO' })
    CODIGO: number;

    @Column({ name: 'DETALLE' })
    DETALLE: string;

    @Column({ name: 'RESPUESTA' })
    RESPUESTA: string;

    @Column({ name: 'TIPOPQR' })
    TIPOPQR: number;

    @Column({ name: 'USUARIOGENERA' })
    USUARIOGENERA: number;

    @Column({ name: 'FECHACREACION' })
    FECHACREACION: Date;

    @Column({ name: 'FECHARESPUESTA' })
    FECHARESPUESTA: Date;

    @Column({ name: 'ESTADOPQR' })
    ESTADOPQR: number;

    @Column({ name: 'CODIGODERECHO' })
    CODIGODERECHO: number;

    @Column({ name: 'NUMEROREFERENCIA' })
    NUMEROREFERENCIA: number;
}
