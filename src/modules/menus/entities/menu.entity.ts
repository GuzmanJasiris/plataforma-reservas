import { Restaurante } from 'src/modules/restaurantes/entities/restaurante.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
} from 'typeorm';

@Entity({ name: 'menus' })
export class Menu {
  @PrimaryGeneratedColumn({ type: 'int4', name: 'id' })
  id: number;

  @Column({ name: 'nombre', type: 'varchar', length: 100 })
  nombre: string;

  @Column({ name: 'descripcion', type: 'text' })
  descripcion: string;

  @Column({ name: 'precio', type: 'decimal', precision: 10, scale: 2 })
  precio: number;

  @ManyToOne(
    () => Restaurante,
    (restaurante: Restaurante) => restaurante.menus,
    {
      cascade: true,
      eager: true,
    },
  )
  restaurante: Restaurante[];
}
