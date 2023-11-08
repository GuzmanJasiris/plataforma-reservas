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
import { RestaurantesService } from './restaurantes.service';
import { CreateRestauranteDto } from './dto/create-restaurante.dto';
import { UpdateRestauranteDto } from './dto/update-restaurante.dto';

@Controller('restaurantes')
export class RestaurantesController {
  constructor(private readonly restaurantesService: RestaurantesService) {}
  @Post('/')
  async createRestaurant(@Body() payload: CreateRestauranteDto) {
    const newCategoria =
      await this.restaurantesService.createRestaurant(payload);
    return newCategoria;
  }

  @Get('/')
  async getRest() {
    const restaurante = await this.restaurantesService.getRest();
    return restaurante;
  }

  @Get('/:id')
  async getRestId(@Param('id', ParseIntPipe) id: number) {
    const restaurante = await this.restaurantesService.getRestId(id);
    return restaurante;
  }

  @Put('/:id')
  async updateRest(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: CreateRestauranteDto,
  ) {
    const restaurante = await this.restaurantesService.updated(id, payload);
    return restaurante;
  }

  @Delete('/:id')
  async deletedRest(@Param('id', ParseIntPipe) id: number) {
    const restaurante = await this.restaurantesService.delete(id);
    return restaurante;
  }
}
