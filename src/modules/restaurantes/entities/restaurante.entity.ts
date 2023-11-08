import { User } from 'src/modules/auth/entities/users.entity';
import { Menu } from 'src/modules/menus/entities/menu.entity';
import { Reserva } from 'src/modules/reservas/entities/reserva.entity';
import { Reseña } from 'src/modules/reseñas/entities/reseña.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'restaurantes' })
export class Restaurante {
  @PrimaryGeneratedColumn({ name: 'id_restaurante', type: 'int4' })
  id: number;

  @Column({ name: 'nombre', type: 'varchar', length: 50 })
  nombre: string;

  @Column({ name: 'direccion', type: 'varchar', length: 100 })
  direccion: string;

  @Column({ name: 'telefono', type: 'numeric' })
  telefono: number;

  @Column({ name: 'capacidad', type: 'int4' })
  capacidad: number;

  @Column({ name: 'horario_apertura', type: 'varchar', length: 10 })
  horarioApertura: string;

  @Column({ name: 'horario_cierre', type: 'varchar', length: 10 })
  horarioCierre: string;

  @Column({ name: 'descripcion', type: 'varchar', length: 200 })
  descripcion: string;

  @Column({ name: 'imagen', type: 'varchar', length: 200 })
  imagen: string;

  @ManyToMany(() => User, (user) => user.restaurante)
  @JoinTable()
  users: User[];

  @OneToMany(() => Menu, (menus: Menu) => menus.restaurante)
  @JoinTable()
  menus: Menu[];

  @OneToMany(() => Reseña, (reseñas: Reseña) => reseñas.restaurante, {
    cascade: true,
    eager: true,
  })
  @JoinTable()
  reseñas: Reseña[];

  @OneToMany(() => Reserva, (reserva: Reserva) => reserva.restaurante, {
    cascade: true,
    eager: true,
  })
  @JoinTable()
  reserva: Reserva[];
}
