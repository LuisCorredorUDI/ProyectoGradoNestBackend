import { PartialType } from '@nestjs/swagger';
import { CreateDeberDto } from './create-deber.dto';

export class UpdateDeberDto extends PartialType(CreateDeberDto) {}
