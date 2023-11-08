import { Injectable } from '@nestjs/common';
import { CreateReservaDto } from './dto/create-reserva.dto';
import { UpdateReservaDto } from './dto/update-reserva.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Reserva } from './entities/reserva.entity';

@Injectable()
export class ReservasService {
  constructor(
    @InjectRepository(Reserva)
    private readonly reservasRepo: Repository<Reserva>,
  ) {}

  async createReservas(payload: CreateReservaDto) {
    const reservas = await this.reservasRepo.create(payload);
    return await this.reservasRepo.save(reservas);
  }

  async getReservas(): Promise<Reserva[]> {
    return await this.reservasRepo.find({ order: { id: 'ASC' } });
  }

  async getReservasId(id: number): Promise<Reserva> {
    const reservas = await this.reservasRepo.findOne({
      where: { id },
    });
    return reservas;
  }

  async updated(id: number, payload: CreateReservaDto): Promise<Reserva> {
    const reservas = await this.reservasRepo.findOne({
      where: { id: id },
    });
    this.reservasRepo.merge(reservas, payload);
    return await this.reservasRepo.save(reservas);
  }

  async delete(id: number): Promise<Reserva> {
    const reservas = await this.reservasRepo.findOne({
      where: { id: id },
    });
    return await this.reservasRepo.remove(reservas);
  }
}
