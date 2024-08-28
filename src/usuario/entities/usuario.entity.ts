import { Column, Entity, PrimaryColumn } from "typeorm";


@Entity('USUARIO')
export class Usuario {

    @PrimaryColumn({ name: 'ID' })
    ID: number;

    @Column({ name: 'NOMBRES' })
    NOMBRES: string;

    @Column({ name: 'APELLIDOS' })
    APELLIDOS: string;

    @Column({ name: 'DOCUMENTO' })
    DOCUMENTO: number;

    @Column({ name: 'CLAVEINGRESO' })
    CLAVEINGRESO: string;

    @Column({ name: 'CLAVEINGRESO' })
    FECHANACIMIENTO: Date;

    @Column({ name: 'NUMEROTELEFONO' })
    NUMEROTELEFONO: number;

    @Column({ name: 'NUMEROMOVIL' })
    NUMEROMOVIL: number;

    @Column({ name: 'CORREO' })
    CORREO: string;

    @Column({ name: 'DIRECCION' })
    DIRECCION: string;

    @Column({ name: 'ESTADO' })
    ESTADO: number;

    @Column({ name: 'CODIGOTIPOUSUARIO' })
    CODIGOTIPOUSUARIO: number;

}

