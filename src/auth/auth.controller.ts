import { Controller, Post, Get, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() body) {
    return this.authService.login(body.email, body.password);
  }

  @Post('register')
  async register(@Body() body) {
    return this.authService.register(body.email, body.password, body.tenantName);
  }
  @Get('tenants')
  getTenants() {
    return this.authService.getTenants();
  }
}