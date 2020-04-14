import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse
} from '@nestjs/swagger';
import { controllerResponse } from '@team-management-api/common';
import { SignInDto } from '../dtos/sign-in.dto';
import { TokenDto } from '../dtos/token.dto';
import { AuthService } from '../services/auth.service';
import { JwtService } from '../services/jwt.service';
import { plainToClass } from 'class-transformer';

@ApiUnauthorizedResponse({ description: 'Unauthorized' })
@ApiForbiddenResponse({ description: 'Forbidden' })
@ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly _service: AuthService, private readonly _jwtService: JwtService) {}

  @Post('sign-in')
  @ApiOperation({ summary: 'Login based on email and password' })
  @ApiOkResponse({
    type: TokenDto,
    description: 'Returns token if successful; error message if not.'
  })
  async signIn(@Body() signInDto: SignInDto): Promise<TokenDto> {
    const action = async (resolve, reject) => {
      const { successful, user, errorMsg } = await this._service.signIn(signInDto);
      resolve(
        plainToClass(
          TokenDto,
          { successful, token: successful ? this._jwtService.generateToken(user) : undefined, errorMsg },
          { strategy: 'excludeAll' }
        )
      );
    };
    return controllerResponse<TokenDto>(action, 'AuthController:signIn');
  }
}
