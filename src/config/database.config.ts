import { registerAs } from '@nestjs/config';

export default registerAs('db', () => ({
  type: 'postgres',
  entities: ['dist/**/*.entity.js'],
  synchronize: true,
  url: process.env.URL_DATABASE,
  logging: true,
}));
