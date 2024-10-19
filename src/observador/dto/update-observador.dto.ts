import { PartialType } from '@nestjs/mapped-types';
import { CreateObservadorDto } from './create-observador.dto';

export class UpdateObservadorDto extends PartialType(CreateObservadorDto) {}
