import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth//jwt/jwt.guard'; // Import the guard

@Controller('user')
export class UserController {
    @Get('me') // Protected route
    @UseGuards(JwtAuthGuard) // Apply the guard
    getProfile(@Request() req) {
      return req.user; // This is the user that was attached to the request by JwtStrategy
    }
}
