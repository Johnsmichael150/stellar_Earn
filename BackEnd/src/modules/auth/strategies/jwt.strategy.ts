import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { AuthService, AuthUser } from '../auth.service';

export interface JwtPayload {
  sub: string;
  stellarAddress: string;
  role: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
   constructor(
     private readonly configService: ConfigService,
     private readonly authService: AuthService,
   ) {
     const publicKey = configService.get<string>('JWT_PUBLIC_KEY');
     if (!publicKey) {
       throw new Error('JWT_PUBLIC_KEY is not defined in environment variables');
     }

     super({
       jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
       ignoreExpiration: false,
       secretOrKey: publicKey,
     });
   }

  async validate(payload: JwtPayload): Promise<AuthUser> {
    return this.authService.validateUser(payload.stellarAddress);
  }
}
