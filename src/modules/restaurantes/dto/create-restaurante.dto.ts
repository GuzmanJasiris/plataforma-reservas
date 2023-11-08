import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateRestauranteDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  id: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  nombre: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  direccion: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  telefono: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  capacidad: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  horarioApertura: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  horarioCierre: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  descripcion: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  imagen: string;
}
