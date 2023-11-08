import { Injectable } from '@nestjs/common';
import { CreateReseñaDto } from './dto/create-reseña.dto';
import { UpdateReseñaDto } from './dto/update-reseña.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Reseña } from './entities/reseña.entity';

@Injectable()
export class ReseñasService {
  constructor(
    @InjectRepository(Reseña)
    private readonly reseñaRepo: Repository<Reseña>,
  ) {}

  async createReseñas(payload: CreateReseñaDto) {
    const reseñas = await this.reseñaRepo.create(payload);
    return await this.reseñaRepo.save(reseñas);
  }

  async getReseñas(): Promise<Reseña[]> {
    return await this.reseñaRepo.find({ order: { id: 'ASC' } });
  }

  async getReseñasId(id: number): Promise<Reseña> {
    const reseñas = await this.reseñaRepo.findOne({
      where: { id },
    });
    return reseñas;
  }

  async updated(id: number, payload: CreateReseñaDto): Promise<Reseña> {
    const reseñas = await this.reseñaRepo.findOne({
      where: { id: id },
    });
    this.reseñaRepo.merge(reseñas, payload);
    return await this.reseñaRepo.save(reseñas);
  }

  async delete(id: number): Promise<Reseña> {
    const reseñas = await this.reseñaRepo.findOne({
      where: { id: id },
    });
    return await this.reseñaRepo.remove(reseñas);
  }
}
