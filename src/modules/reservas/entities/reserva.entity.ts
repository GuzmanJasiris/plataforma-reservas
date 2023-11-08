import { User } from 'src/modules/auth/entities/users.entity';
import { Restaurante } from 'src/modules/restaurantes/entities/restaurante.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'reservas' })
export class Reserva {
  @PrimaryGeneratedColumn({ name: 'id_reserva', type: 'int4' })
  id: number;

  @Column({ type: 'date', name: 'fecha_reserva' })
  fecha_reserva: Date;

  @Column({ type: 'int4', name: 'numero_comensales' })
  numero_comensales: number;

  @ManyToOne(() => User, (user) => user.reserva)
  user: User[];

  @ManyToOne(() => Restaurante, (restaurante) => restaurante.reserva)
  restaurante: Restaurante[];
}
