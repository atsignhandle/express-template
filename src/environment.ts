import { cleanEnv, host, port, str, url, num } from 'envalid';
import dotenv from 'dotenv';

dotenv.config();

const validated = cleanEnv(process.env, {
  API_SECRET: str(),
  API_KEY: str(),
  PORT: port(),
});

export const environment = {
  production: validated.isProduction, // true when NODE_ENV=production
  development: validated.isDevelopment, // true when NODE_ENV=development
  jwtSecret: validated.API_SECRET,
  apiKey: validated.API_KEY,
  port: validated.PORT,
};
