import { Injectable } from '@nestjs/common';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Categoria } from './entities/categoria.entity';

@Injectable()
export class CategoriasService {
  constructor(
    @InjectRepository(Categoria)
    private readonly categoriaRepo: Repository<Categoria>,
  ) {}

  async createCategoria(payload: CreateCategoriaDto) {
    const categorias = await this.categoriaRepo.create(payload);
    return await this.categoriaRepo.save(categorias);
  }

  async getCat(): Promise<Categoria[]> {
    return await this.categoriaRepo.find({ order: { id: 'ASC' } });
  }

  async getCatId(id: number): Promise<Categoria> {
    const categorias = await this.categoriaRepo.findOne({
      where: { id },
    });
    return categorias;
  }

  async updated(id: number, payload: CreateCategoriaDto): Promise<Categoria> {
    const categorias = await this.categoriaRepo.findOne({
      where: { id: id },
    });
    this.categoriaRepo.merge(categorias, payload);
    return await this.categoriaRepo.save(categorias);
  }

  async delete(id: number): Promise<Categoria> {
    const categorias = await this.categoriaRepo.findOne({
      where: { id: id },
    });
    return await this.categoriaRepo.remove(categorias);
  }
}
