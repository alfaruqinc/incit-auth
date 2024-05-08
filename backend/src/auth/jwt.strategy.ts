import { Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import authConfig from 'src/config/auth.config';
import { JwtPayload } from './jwt-payload.interface';
import { UsersService } from 'src/users/users.service';

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly userSerivce: UsersService,
    @Inject(authConfig.KEY)
    private authCfg: ConfigType<typeof authConfig>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: authCfg.JWT_SECRET,
      ignoreExpiration: false,
    });
  }

  async validate(payload: JwtPayload) {
    return await this.userSerivce.getUserById(payload.sub);
  }
}
