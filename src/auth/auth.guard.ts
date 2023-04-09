import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { IS_PUBLIC_KEY } from "src/common/skipAuth/skipAuth";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService, private configService: ConfigService, private reflector: Reflector) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest()
    const token = this.extractTokenFromHeader(request)

    if (!token) {
      throw new UnauthorizedException()
    }

    try {
      const secret = this.configService.get<string>('JWT_SECRET');
      const payload = await this.jwtService.verifyAsync(token, {
        secret
      })
      request['user'] = payload;
    } catch (error) {
      throw new UnauthorizedException()
    }
    return true;
  }

  private extractTokenFromHeader(request: Request) {
    const [type, token] = request.headers.authorization?.split(" ") ?? [];
    return type === 'Bearer' ? token : undefined;

  }

}
