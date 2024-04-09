import { config } from 'dotenv';
config({ path: `.env.${process.env.NODE_ENV}` });
import type { Config } from 'drizzle-kit';
import { getConfig } from 'src/utils/configuration';

const dbEnvVariables = getConfig()?.database;

const dbCredentials = {
  host: dbEnvVariables?.host || '',
  user: dbEnvVariables?.user || '',
  password: dbEnvVariables?.password || '',
  database: dbEnvVariables?.name || '',
  port: Number(dbEnvVariables?.port) || 5432,
};

export default {
  schema: './src/drizzle/schema.ts',
  out: './drizzle',
  driver: 'pg',
  verbose: true,
  strict: true,
  dbCredentials,
} satisfies Config;
