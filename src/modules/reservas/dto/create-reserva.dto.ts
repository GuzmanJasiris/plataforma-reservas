import { IsInt, IsDate, Min, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateReservaDto {
  @IsNumber()
  @IsNotEmpty({ message: 'El campo "id" no puede estar vacío.' })
  id: number;

  @IsDate({ message: 'El campo "fecha_reserva" debe ser una fecha válida.' })
  @IsNotEmpty({ message: 'El campo "fecha_reserva" no puede estar vacío.' })
  fecha_reserva: Date;

  @IsInt({ message: 'El campo "numero_comensales" debe ser un número entero.' })
  @Min(1, {
    message: 'El campo "numero_comensales" debe ser un número entero positivo.',
  })
  numero_comensales: number;
}
