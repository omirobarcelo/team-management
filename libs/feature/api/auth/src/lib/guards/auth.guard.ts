import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class SnkAuthGuard extends AuthGuard('jwt') {}
