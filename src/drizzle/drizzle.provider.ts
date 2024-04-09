import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { getConfig } from 'src/utils/configuration';
import * as schema from './schema';

export const DrizzleAsyncProvider = 'drizzleProvider';

export const drizzleProvider = [
  {
    provide: DrizzleAsyncProvider,
    useFactory: async () => {
      const queryClient = postgres(getConfig().database.connectionUrl);
      const db = drizzle(queryClient, { schema });
      return db;
    },
    exports: [DrizzleAsyncProvider],
  },
];
