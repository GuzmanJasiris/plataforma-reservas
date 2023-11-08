import { Injectable } from '@nestjs/common';
import { CreateRestauranteDto } from './dto/create-restaurante.dto';
import { UpdateRestauranteDto } from './dto/update-restaurante.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Restaurante } from './entities/restaurante.entity';

@Injectable()
export class RestaurantesService {
  constructor(
    @InjectRepository(Restaurante)
    private readonly restRepo: Repository<Restaurante>,
  ) {}
  async createRestaurant(payload: CreateRestauranteDto) {
    const restaurant = await this.restRepo.create(payload);
    return await this.restRepo.save(restaurant);
  }

  async getRest(): Promise<Restaurante[]> {
    return await this.restRepo.find({ order: { id: 'ASC' } });
  }

  async getRestId(id: number): Promise<Restaurante> {
    const restaurant = await this.restRepo.findOne({
      where: { id },
    });
    return restaurant;
  }

  async updated(
    id: number,
    payload: CreateRestauranteDto,
  ): Promise<Restaurante> {
    const restaurant = await this.restRepo.findOne({
      where: { id: id },
    });
    this.restRepo.merge(restaurant, payload);
    return await this.restRepo.save(restaurant);
  }

  async delete(id: number): Promise<Restaurante> {
    const restaurant = await this.restRepo.findOne({
      where: { id: id },
    });
    return await this.restRepo.remove(restaurant);
  }
}
