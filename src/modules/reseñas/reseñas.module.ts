import { Module } from '@nestjs/common';
import { ReseñasService } from './reseñas.service';
import { ReseñasController } from './reseñas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reseña } from './entities/reseña.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Reseña])],
  controllers: [ReseñasController],
  providers: [ReseñasService],
})
export class ReseñasModule {}
