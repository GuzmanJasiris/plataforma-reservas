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
import { ReseñasService } from './reseñas.service';
import { CreateReseñaDto } from './dto/create-reseña.dto';
import { UpdateReseñaDto } from './dto/update-reseña.dto';

@Controller('resenias')
export class ReseñasController {
  constructor(private readonly reseñasService: ReseñasService) {}

  @Post('/')
  async createReseñas(@Body() payload: CreateReseñaDto) {
    const newCategoria = await this.reseñasService.createReseñas(payload);
    const data = {
      data: newCategoria,
      message: 'creado',
    };
    return data;
  }

  @Get('/')
  async getReseñas() {
    const reseñas = await this.reseñasService.getReseñas();
    const data = {
      data: reseñas,
      message: 'ok',
    };
    return data;
  }

  @Get('/:id')
  async getReseñasId(@Param('id', ParseIntPipe) id: number) {
    const reseñas = await this.reseñasService.getReseñasId(id);
    const data = {
      data: reseñas,
      message: 'ok',
    };
    return data;
  }

  @Put('/:id')
  async updateCat(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: CreateReseñaDto,
  ) {
    const reseñas = await this.reseñasService.updated(id, payload);
    const data = {
      data: reseñas,
    };
    return data;
  }

  @Delete('/:id')
  async deletedCurso(@Param('id', ParseIntPipe) id: number) {
    const reseñas = await this.reseñasService.delete(id);
    const data = {
      data: reseñas,
    };
    return data;
  }
}
