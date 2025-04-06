import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy'; // Add JwtStrategy import

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      secret: 'jwtsecret',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AuthService, JwtStrategy], // Add JwtStrategy to providers
  controllers: [AuthController],
})
export class AuthModule {}
