import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly type: string) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    if (!request.headers.authorization) {
      return false;
    }
    request.user = this.validateToken(request.headers.authorization);
    return true;
  }

  validateToken(auth: string) {
    if (auth.split(' ')[0] !== 'Bearer') {
      throw new HttpException('Invalid token', HttpStatus.FORBIDDEN);
    }
    try {
      const token = auth.split(' ')[1];
      const decode = jwt.verify(
        token,
        this.type === 'user' ? process.env.SECRET : process.env.ADMIN_SECRET,
      );
      return decode;
    } catch (error) {
      const message = 'Token Error: ' + (error.message || error.name);
      throw new HttpException(message, HttpStatus.FORBIDDEN);
    }
  }
}
