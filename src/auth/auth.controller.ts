import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { AuthDTO } from './dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  // auth service
  constructor(private authService: AuthService) {}

  @Get('hashPassword') // register new user
  // register(@Req() request: Request) {
  hashPassword(@Query('password') password: string) {
    // body'type must be a "Data Transfer object" - DTO
    // console.log(authDTO);

    return this.authService.hashPassword(password);
  }

  @Post('login') // login new user
  login(@Query('apiKey') apiKey: string, @Body() authDTO: AuthDTO) {
    return this.authService.login(apiKey, authDTO);
  }
}
