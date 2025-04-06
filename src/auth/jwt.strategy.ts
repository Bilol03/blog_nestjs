import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from './jwt-payload.interface';
import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extract the JWT from the Bearer token in Authorization header
      secretOrKey: 'jwtsecret', // You can move this to env variables
    });
  }

  async validate(payload: JwtPayload) {
    return { userId: payload.sub, email: payload.email }; // return user details to be added to the request object
  }
}
