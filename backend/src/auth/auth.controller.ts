import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { Response } from 'express';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { Public } from './public.decorator';
import { RequestWithUser } from './request-with-user.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('register')
  async register(
    @Body() registerDto: CreateUserDto,
    @Res() response: Response,
  ) {
    const cookie = await this.authService.register(registerDto);
    response.setHeader('Set-Cookie', cookie);

    return response.send({ message: 'register success' });
  }

  @Public()
  @Post('login')
  async login(@Body() loginDto: LoginDto, @Res() response: Response) {
    const cookie = await this.authService.login(loginDto);
    response.setHeader('Set-Cookie', cookie);

    return response.send({ message: 'login success' });
  }

  @Post('logout')
  async logout(@Req() request: RequestWithUser, @Res() response: Response) {
    const user = request.user;

    const cookie = await this.authService.logout(user.email);
    response.setHeader('Set-Cookie', cookie);

    return response.send({ message: 'logout success' });
  }
}
