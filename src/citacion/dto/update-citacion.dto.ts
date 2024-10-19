import { PartialType } from '@nestjs/mapped-types';
import { CreateCitacionDto } from './create-citacion.dto';

export class UpdateCitacionDto extends PartialType(CreateCitacionDto) {}
