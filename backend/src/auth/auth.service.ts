import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { eq } from 'drizzle-orm';
import authConfig from 'src/config/auth.config';
import { DRIZZLE_PROVIDER, DrizzlePostgres } from 'src/db/drizzle.provider';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { users } from 'src/users/users.schema';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    @Inject(DRIZZLE_PROVIDER)
    private readonly db: DrizzlePostgres,
    @Inject(authConfig.KEY)
    private authCfg: ConfigType<typeof authConfig>,
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

    await this.usersService.incrementLoginCountByOne(user.email);

    const payload = {
      sub: user.id,
      email: user.email,
      name: user.name,
    };

    const accessToken = await this.jwtService.signAsync(payload);

    return this.getCookieWithJwt(accessToken);
  }

  getCookieWithJwt(token: string) {
    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.authCfg.JWT_EXPIRES}`;
  }

  async logout(email: string): Promise<void> {
    const logoutAt = new Date();

    await this.db
      .update(users)
      .set({ logoutAt: logoutAt })
      .where(eq(users.email, email));
  }
}
