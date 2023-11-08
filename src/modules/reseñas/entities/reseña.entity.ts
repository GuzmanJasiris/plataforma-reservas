import { Restaurante } from 'src/modules/restaurantes/entities/restaurante.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToMany,
  ManyToOne,
} from 'typeorm';

@Entity({ name: 'reseñas' })
export class Reseña {
  @PrimaryGeneratedColumn({ type: 'int4', name: 'id' })
  id: number;

  @Column({ name: 'comentario', type: 'varchar', length: 200 })
  comentario: string;

  @Column({ name: 'calificacion', type: 'int4' })
  calificacion: number;

  @CreateDateColumn({ name: 'fecha', type: 'timestamp' })
  fecha: Date;

  @ManyToOne(() => Restaurante, (restaurante) => restaurante.reseñas)
  restaurante: Restaurante[];
}
