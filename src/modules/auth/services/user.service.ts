import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  Param,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersDto, UserPartialTypeDto } from '../dto/user.dto';
import { Repository, DataSource } from 'typeorm';
import { User } from '../entities/users.entity';
import { Inject } from '@nestjs/common';
import { UsersImage } from '../entities/user_image.entities';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  users: any[] = [];

  // Inyectamos el servicio de users
  constructor(
    @InjectRepository(UsersImage)
    private readonly usersImageRepository: Repository<UsersImage>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @Inject(DataSource) private readonly dataSources: DataSource,
  ) {}

  countItems() {
    return this.users.length;
  }

  async findByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: { email },
      select: {
        id: true,
        email: true,
        name: true,
        password: true,
      },
    });

    if (!user) {
      throw new NotFoundException('No se encontro el usuario');
    }

    return user;
  }

  async create(payload: UsersDto) {
    console.log(typeof payload.password);
    const { image = [], ...rest } = payload;
    const user = await this.userRepository.create({
      ...rest,
      image: image.map((image) =>
        this.usersImageRepository.create({ url: image }),
      ),
      password: await bcrypt.hash(payload.password, 10),
    });
    console.log(user);

    const userSaved = await this.userRepository.save(user);
    return userSaved;
  }

  async getUsers() {
    const users = await this.userRepository.find();
    return users;
  }

  async getUser(id: number) {
    const user = await this.userRepository.findOne({ where: { id: id } });
    return user;
  }

  async updated(id: number, payload: UserPartialTypeDto) {
    const { image, ...rest } = payload;
    const user = await this.userRepository.preload({
      id: id,
      ...rest,
      image: [],
    });
    const queryRunner = this.dataSources.createQueryRunner();
    await queryRunner.startTransaction();
    await queryRunner.connect();
    if (image) {
      await queryRunner.manager.delete(UsersImage, { user: { id } });
      user.image = image.map((valorimage) =>
        this.usersImageRepository.create({ url: valorimage }),
      );
    } else {
      user.image = await this.usersImageRepository.findBy({
        user: { id: id },
      });
    }
    await queryRunner.manager.save(user);
    await queryRunner.commitTransaction();
    await queryRunner.release();
    return user;
  }
  deleted(id: number) {
    const index = this.users.findIndex((user) => user.id === id);
    this.users.splice(index, 1);
    return 'Usuario eliminado con éxito';
  }
}
