import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './users.entity';

@Entity({ name: 'usersImage' })
export class UsersImage {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int4' })
  id?: number;

  @Column()
  url: string;

  @ManyToOne(() => User, (user) => user.image, { onDelete: 'CASCADE' })
  user: User;
}
