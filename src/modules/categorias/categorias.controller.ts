import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  ParseIntPipe,
} from '@nestjs/common';

import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { CategoriasService } from './categorias.service';

@Controller('categorias')
export class CategoriasController {
  constructor(private readonly categoriasService: CategoriasService) {}

  @Post('/')
  async createCategoria(@Body() payload: CreateCategoriaDto) {
    const newCategoria = await this.categoriasService.createCategoria(payload);
    const data = {
      data: newCategoria,
      message: 'creado',
    };
    return data;
  }

  @Get('/')
  async getCat() {
    const categoria = await this.categoriasService.getCat();
    const data = {
      data: categoria,
      message: 'ok',
    };
    return data;
  }

  @Get('/:id')
  async getCatId(@Param('id', ParseIntPipe) id: number) {
    const categoria = await this.categoriasService.getCatId(id);
    const data = {
      data: categoria,
      message: 'ok',
    };
    return data;
  }

  @Put('/:id')
  async updateCat(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: CreateCategoriaDto,
  ) {
    const categoria = await this.categoriasService.updated(id, payload);
    const data = {
      data: categoria,
    };
    return data;
  }

  @Delete('/:id')
  async deletedCurso(@Param('id', ParseIntPipe) id: number) {
    const categoria = await this.categoriasService.delete(id);
    const data = {
      data: categoria,
    };
    return data;
  }
}
