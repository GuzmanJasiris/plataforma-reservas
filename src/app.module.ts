import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RestaurantesModule } from './modules/restaurantes/restaurantes.module';
import { MenusModule } from './modules/menus/menus.module';
import { ReservasModule } from './modules/reservas/reservas.module';
import { CategoriasModule } from './modules/categorias/categorias.module';
import { ReseñasModule } from './modules/reseñas/reseñas.module';
import { FilesModule } from './modules/files/files.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: process.env.DB_HOST,
        port: +process.env.DB_PORT,
        database: process.env.DB_NAME,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        migrationsTableName: configService.get('MIGRATIONS_TABLE_NAME'),
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    AuthModule,
    RestaurantesModule,
    MenusModule,
    ReservasModule,
    CategoriasModule,
    ReseñasModule,
    FilesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
