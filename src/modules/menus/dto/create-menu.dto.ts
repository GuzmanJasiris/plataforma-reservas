import { IsString, Length, IsNumber, IsDecimal, Min } from 'class-validator';

export class CreateMenuDto {
  @IsNumber({}, { message: 'El campo "id" debe ser un número.' })
  @Min(1, { message: 'El campo "id" debe ser un número positivo.' })
  id: number;

  @IsString({ message: 'El campo "nombre" debe ser una cadena de texto.' })
  @Length(1, 100, {
    message: 'El campo "nombre" debe tener entre 1 y 100 caracteres.',
  })
  nombre: string;

  @IsString({ message: 'El campo "descripcion" debe ser una cadena de texto.' })
  descripcion: string;

  @IsDecimal(
    { decimal_digits: '2' },
    {
      message:
        'El campo "precio" debe ser un número decimal con dos decimales.',
    },
  )
  precio: number;
}
