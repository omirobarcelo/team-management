import { RoleType } from '../../types';

export interface JwtPayload {
  id: string;
  role: RoleType;
  iat: number;
  exp: number;
  sub: string;
}
