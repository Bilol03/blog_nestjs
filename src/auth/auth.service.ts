import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signup(email: string, password: string, name: string) {
    const userExists = await this.userService.findByEmail(email);
    if (userExists) throw new UnauthorizedException('Email already used');

    const user = await this.userService.createUser({ email, password, name });
    return this.signToken(user.id, user.email);
  }

  async signin(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const passwordMatches = await bcrypt.compare(password, user.password);
    if (!passwordMatches) throw new UnauthorizedException('Invalid credentials');

    return this.signToken(user.id, user.email);
  }

  private signToken(userId: number, email: string): { access_token: string } {
    const payload = { sub: userId, email };
    const token = this.jwtService.sign(payload);
    return { access_token: token };
  }
}
