import { IsInt, IsString, Min, Max, Length, IsDate } from 'class-validator';

export class CreateReseñaDto {
  @IsInt({ message: 'El campo "id" debe ser un número entero.' })
  @Min(1, { message: 'El campo "id" debe ser un número entero positivo.' })
  id: number;

  @IsString({ message: 'El campo "comentario" debe ser una cadena de texto.' })
  @Length(1, 200, {
    message: 'El campo "comentario" debe tener entre 1 y 200 caracteres.',
  })
  comentario: string;

  @IsInt({ message: 'El campo "calificacion" debe ser un número entero.' })
  @Min(1, {
    message: 'El campo "calificacion" debe ser un número entero positivo.',
  })
  @Max(5, { message: 'El campo "calificacion" no puede ser mayor que 5.' })
  calificacion: number;

  @IsDate({ message: 'El campo "fecha" debe ser una fecha válida.' })
  fecha: Date;
}
