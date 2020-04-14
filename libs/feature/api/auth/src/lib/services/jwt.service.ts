import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserEntity } from '@team-management-api/core/entities/user.entity';
import * as fs from 'fs';
import { sign } from 'jsonwebtoken';

@Injectable()
export class JwtService {
  static readonly RSA_PUBLIC_KEY = fs.readFileSync('./public.key');
  static readonly RSA_PRIVATE_KEY = fs.readFileSync('./private.key');

  static readonly ALG = 'RS256';

  expiration: string;

  constructor(private readonly _configService: ConfigService) {
    this.expiration = this._configService.get('JWT_EXPIRATION', '7 days');
  }

  private static sign(userId: string, role: 'admin' | 'trainer' | 'player', expiration: string): string {
    return sign(
      {
        id: userId,
        role: role
      },
      JwtService.RSA_PRIVATE_KEY,
      {
        algorithm: JwtService.ALG,
        expiresIn: expiration,
        subject: userId
      }
    );
  }

  generateToken(user: UserEntity): string {
    return JwtService.sign(user.id, user.role, this.expiration);
  }
}
