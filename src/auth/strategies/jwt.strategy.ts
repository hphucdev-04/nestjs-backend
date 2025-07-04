import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Request } from 'express';
import { UserService } from 'src/user/user.service';
import { TokenPayload } from '../auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          const cookieToken = request?.cookies?.Authentication;
          if (cookieToken) {
            return cookieToken;
          }
          
          const authHeader = request?.headers?.authorization;
          if (authHeader && authHeader.startsWith('Bearer ')) {
            return authHeader.substring(7);
          }
          
          return null;
        },
      ]),
      secretOrKey: configService.get<string>('jwt.access.secret') as string,
    });
  }

  async validate(payload: TokenPayload) {
    const user = await this.userService.findById(payload.sub);
    if (!user) {
      return null;
    }
    return user;
  }
}