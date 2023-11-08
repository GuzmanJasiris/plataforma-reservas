import { Injectable } from '@nestjs/common';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Menu } from './entities/menu.entity';

@Injectable()
export class MenusService {
  constructor(
    @InjectRepository(Menu)
    private readonly menuRepo: Repository<Menu>,
  ) {}

  async createCategoria(payload: CreateMenuDto) {
    const menu = await this.menuRepo.create(payload);
    return await this.menuRepo.save(menu);
  }

  async getMenu(): Promise<Menu[]> {
    return await this.menuRepo.find({ order: { id: 'ASC' } });
  }

  async getMenuId(id: number): Promise<Menu> {
    const menu = await this.menuRepo.findOne({
      where: { id },
    });
    return menu;
  }

  async updated(id: number, payload: CreateMenuDto): Promise<Menu> {
    const menu = await this.menuRepo.findOne({
      where: { id: id },
    });
    this.menuRepo.merge(menu, payload);
    return await this.menuRepo.save(menu);
  }

  async delete(id: number): Promise<Menu> {
    const menu = await this.menuRepo.findOne({
      where: { id: id },
    });
    return await this.menuRepo.remove(menu);
  }
}
