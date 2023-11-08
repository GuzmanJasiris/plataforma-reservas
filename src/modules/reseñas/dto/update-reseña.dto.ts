import { PartialType } from '@nestjs/swagger';
import { CreateReseñaDto } from './create-reseña.dto';

export class UpdateReseñaDto extends PartialType(CreateReseñaDto) {}
