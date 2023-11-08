import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Put,
} from '@nestjs/common';
import { ReservasService } from './reservas.service';
import { CreateReservaDto } from './dto/create-reserva.dto';
import { UpdateReservaDto } from './dto/update-reserva.dto';

@Controller('reservas')
export class ReservasController {
  constructor(private readonly reservasService: ReservasService) {}

  @Post('/')
  async createCategoria(@Body() payload: CreateReservaDto) {
    const newReservas = await this.reservasService.createReservas(payload);
    return newReservas;
  }

  @Get('/')
  async getCat() {
    const reservas = await this.reservasService.getReservas();
    return reservas;
  }

  @Get('/:id')
  async getCatId(@Param('id', ParseIntPipe) id: number) {
    const reservas = await this.reservasService.getReservasId(id);
    return reservas;
  }

  @Put('/:id')
  async updateCat(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: CreateReservaDto,
  ) {
    const reservas = await this.reservasService.updated(id, payload);
    return reservas;
  }

  @Delete('/:id')
  async deletedCurso(@Param('id', ParseIntPipe) id: number) {
    const reservas = await this.reservasService.delete(id);
    return reservas;
  }
}
