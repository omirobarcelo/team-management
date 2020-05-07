import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { UserEntity } from '@team-management-api/core/entities/user.entity';
import { JwtPayload } from '@team-management/data/interfaces';
import { plainToClass } from 'class-transformer';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtService } from '../services/jwt.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: JwtService.RSA_PUBLIC_KEY
    });
  }

  async validate(payload: JwtPayload) {
    const user = plainToClass(UserEntity, payload);
    return user;
  }
}
