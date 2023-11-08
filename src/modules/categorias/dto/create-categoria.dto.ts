import {
  IsInt,
  IsString,
  Length,
  IsBoolean,
  IsOptional,
} from 'class-validator';

export class CreateCategoriaDto {
  @IsInt({ message: 'El campo "id" debe ser un número entero.' })
  id: number;

  @IsString({ message: 'El campo "nombre" debe ser una cadena de texto.' })
  @Length(1, 50, {
    message: 'El campo "nombre" debe tener entre 1 y 50 caracteres.',
  })
  nombre: string;

  @IsString({ message: 'El campo "descripcion" debe ser una cadena de texto.' })
  @IsOptional()
  descripcion: string;

  @IsString({ message: 'El campo "imagen" debe ser una cadena de texto.' })
  @IsOptional()
  imagen: string;

  @IsBoolean({ message: 'El campo "activo" debe ser un valor booleano.' })
  activo: boolean;

  @IsInt({ message: 'El campo "orden" debe ser un número entero.' })
  orden: number;
}
