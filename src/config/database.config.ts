import { registerAs } from '@nestjs/config';

export default registerAs('db', () => ({
  type: 'postgres',
  entities: ['dist/**/*.entity.js'],
  synchronize: true,
  url: process.env.URL_DATABASE,
  // port: '5432',
  // username: 'nxxudfgi',
  // password: '2gXF-pVmoQZvS5N_sUEdUG0dO7kWxrYj',
  // database: 'wit',
  logging: true,
}));
