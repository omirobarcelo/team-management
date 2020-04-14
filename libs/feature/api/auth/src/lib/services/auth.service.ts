import { Injectable } from '@nestjs/common';
import { UserEntity } from '@team-management-api/core/entities/user.entity';
import { UsersService } from '@team-management-api/core/services/users.service';
import { SignInDto } from '../dtos/sign-in.dto';

@Injectable()
export class AuthService {
  constructor(private readonly _usersService: UsersService) {}

  async signIn(signInDto: SignInDto): Promise<{ successful: boolean; user?: UserEntity; errorMsg?: string }> {
    const user = await this._usersService.findByEmail(signInDto.email);
    if (user) {
      if (await user.validatePassword(signInDto.password)) {
        return { successful: true, user };
      } else {
        return { successful: false, errorMsg: 'Password is not correct.' };
      }
    } else {
      return { successful: false, errorMsg: 'E-mail is not correct.' };
    }
  }
}
