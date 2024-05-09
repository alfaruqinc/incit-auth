import { ValidationPipe } from '@nestjs/common';
import { ConfigService, ConfigType } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import baseConfig from './config/base.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const baseCfg = app.get(ConfigService<ConfigType<typeof baseConfig>>);
  const corsOrigin = baseCfg.get('CORS_ORIGIN');

  app.enableCors({ credentials: true, origin: corsOrigin });
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();
