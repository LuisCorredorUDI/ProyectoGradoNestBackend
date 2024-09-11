import { PartialType } from '@nestjs/mapped-types';
import { CreateDerechoDto } from './create-derecho.dto';

export class UpdateDerechoDto extends PartialType(CreateDerechoDto) {}
