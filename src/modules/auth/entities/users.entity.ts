import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UsersImage } from './user_image.entities';
import { Restaurante } from 'src/modules/restaurantes/entities/restaurante.entity';
import { Reserva } from 'src/modules/reservas/entities/reserva.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int4' })
  id?: number;
  @Column({ name: 'name', type: 'varchar', length: 100, nullable: false })
  name: string;

  @Column({
    name: 'email',
    type: 'varchar',
    length: 100,
    nullable: false,
    unique: true,
  })
  email: string;
  @Column({
    name: 'password',
    type: 'varchar',
    length: 100,
    nullable: false,
    select: false,
  })
  password: string;
  @Column({ name: 'telefono', type: 'varchar', length: 20, nullable: true })
  telefono: string;

  @Column({ name: 'token', type: 'varchar', length: 200, nullable: true })
  token: string;
  @Column({
    name: 'is_active',
    type: 'boolean',
    nullable: false,
    default: true,
  })
  isActive: boolean;

  @OneToOne(() => UsersImage, (userImage) => userImage.user, {
    onDelete: 'CASCADE',
    eager: true,
  })
  image: UsersImage[];

  @ManyToMany(() => Restaurante, (restaurante) => restaurante.users, {
    cascade: true,
    eager: true,
  })
  @JoinTable({ name: 'users_restaurantes' })
  restaurante: Restaurante[];

  @OneToMany(() => Reserva, (reserva) => reserva.user, {
    cascade: true,
    eager: true,
  })
  @JoinTable({ name: 'users_reservas' })
  reserva: Reserva[];
}
