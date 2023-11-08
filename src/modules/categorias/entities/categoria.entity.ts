import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'categorias' })
export class Categoria {
  @PrimaryGeneratedColumn({ type: 'int4', name: 'id' })
  id: number;

  @Column({ name: 'nombre', type: 'varchar', length: 50 })
  nombre: string;

  @Column({ name: 'descripcion', type: 'text', nullable: true })
  descripcion: string;

  @Column({ name: 'imagen', type: 'varchar', length: 100, nullable: true })
  imagen: string; // Puede ser una URL o una ruta a una imagen

  @Column({ name: 'activo', type: 'boolean', default: true })
  activo: boolean; // Un indicador de si la categoría está activa o no

  @Column({ name: 'orden', type: 'int4', default: 0 })
  orden: number;
}
