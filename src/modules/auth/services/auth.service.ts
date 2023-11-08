import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateAuthDto } from '../dto/create-auth.dto';

import { UsersService } from './user.service';

@Injectable()
export class AuthService {
  constructor(private readonly usersServices: UsersService) {}
  async signIn(payload: CreateAuthDto) {
    try {
      const { password, ...user } = await this.usersServices.findByEmail(
        payload.email,
      );

      const isMatch: boolean = await bcrypt.compare(payload.password, password);
      if (!isMatch) {
        throw new UnauthorizedException('Credenciales inválidas');
      }
      const payloadJwt = {
        sub: user.id,
        name: user.name,
      };

      return {
        user,
        isMatch,
      };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
