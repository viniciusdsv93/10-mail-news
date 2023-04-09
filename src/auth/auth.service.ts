import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { compareSync } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async signIn(email: string, pass: string): Promise<any> {
    const user = await this.usersService.getUserByEmail(email);

    if (!user || !compareSync(pass, user?.password)) {
      throw new UnauthorizedException();
    }

    const payload = { email: user.email, sub: user.id };
    const secret = this.configService.get<string>('JWT_SECRET');

    return {
      access_token: await this.jwtService.signAsync(payload, {
        secret,
      }),
    };
  }
}
