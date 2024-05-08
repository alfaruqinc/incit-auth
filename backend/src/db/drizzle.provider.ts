import { FactoryProvider } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { type PostgresJsDatabase, drizzle } from 'drizzle-orm/postgres-js';
import * as postgres from 'postgres';
import dbConfig from 'src/config/db.config';

export const DRIZZLE_PROVIDER = Symbol('DRIZZLE_PROVIDER');
export type DrizzlePostgres = PostgresJsDatabase;

export const drizzleProvider: FactoryProvider = {
  provide: DRIZZLE_PROVIDER,
  inject: [dbConfig.KEY],
  useFactory: (config: ConfigType<typeof dbConfig>) => {
    const queryClient = postgres(config.DB_URL);

    return drizzle(queryClient);
  },
};
