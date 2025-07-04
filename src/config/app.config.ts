import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  port: process.env.PORT,
  globalPrefix: process.env.API_PREFIX || 'api',
  frontendUrl: process.env.FRONTEND_URL,
  environment: process.env.NODE_ENV || 'development',
}));
