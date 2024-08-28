import { PartialType } from '@nestjs/mapped-types';
import { CreateFuncionesGlobaleDto } from './create-funciones-globale.dto';

export class UpdateFuncionesGlobaleDto extends PartialType(CreateFuncionesGlobaleDto) {}
