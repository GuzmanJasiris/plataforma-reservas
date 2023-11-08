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
import { MenusService } from './menus.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';

@Controller('menus')
export class MenusController {
  constructor(private readonly menusService: MenusService) {}

  @Post('/')
  async createCategoria(@Body() payload: CreateMenuDto) {
    const newMenu = await this.menusService.createCategoria(payload);
    const data = {
      data: newMenu,
      message: 'creado',
    };
    return data;
  }

  @Get('/')
  async getMenu() {
    const menu = await this.menusService.getMenu();
    const data = {
      data: menu,
      message: 'ok',
    };
    return data;
  }

  @Get('/:id')
  async getMenuId(@Param('id', ParseIntPipe) id: number) {
    const menu = await this.menusService.getMenuId(id);
    const data = {
      data: menu,
      message: 'ok',
    };
    return data;
  }

  @Put('/:id')
  async updateCat(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: CreateMenuDto,
  ) {
    const menu = await this.menusService.updated(id, payload);
    const data = {
      data: menu,
    };
    return data;
  }

  @Delete('/:id')
  async deletedCurso(@Param('id', ParseIntPipe) id: number) {
    const menu = await this.menusService.delete(id);
    const data = {
      data: menu,
    };
    return data;
  }
}
