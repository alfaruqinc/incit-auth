import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(body: CreateUserDto) {
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(body.password, saltOrRounds);
    const newUser = {
      ...body,
      password: hashedPassword,
    };

    const user = await this.usersService.createUser(newUser);

    const payload = {
      sub: user.id,
      name: user.name,
      email: user.email,
    };

    const accessToken = await this.jwtService.signAsync(payload);

    return { accessToken };
  }

  async login(body: LoginDto) {
    const user = await this.usersService.getUserByEmailWithPassword(body.email);
    if (!user) {
      throw new UnauthorizedException('email or password is wrong, bro');
    }

    const isValidated = await bcrypt.compare(body.password, user.password);
    if (!isValidated) {
      throw new UnauthorizedException('email or password is wrong, bro');
    }

    const payload = {
      sub: user.id,
      email: user.email,
      name: user.name,
    };

    const accessToken = await this.jwtService.signAsync(payload);

    return { accessToken };
  }
}
