import {
  CanActivate,
  ExecutionContext,
  HttpStatus,
  Injectable,
  Logger,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { env } from 'process';
import { ErrorResponse } from 'src/common/responses/error.response';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
    private readonly logger: Logger,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      this.logger.error(
        'user unathorized',
        new ErrorResponse(HttpStatus.UNAUTHORIZED, 'Unauthorized'),
      );
      throw new ErrorResponse(HttpStatus.UNAUTHORIZED, 'Unauthorized');
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: env.JWT_SECRET,
      });

      const roles = this.reflector.get<string[]>('roles', context.getHandler());

      if (!roles || roles.length === 0) {
        request['user'] = payload;
        return true;
      }

      const userRoles: string[] = payload.roles?.map((role) => role.name) || [];
      const hasAllowedRole = userRoles.some((roleName) =>
        roles.includes(roleName),
      );

      if (!hasAllowedRole) {
        throw new ErrorResponse(
          HttpStatus.FORBIDDEN,
          'Forbidden: Insufficient role',
        );
      }

      request['user'] = payload;
    } catch (error) {
      this.logger.error('Forbidden: Insufficient role', error);
      if (error instanceof ErrorResponse) {
        throw error;
      }
      throw new ErrorResponse(HttpStatus.UNAUTHORIZED, 'Unauthorized');
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
