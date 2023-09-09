import { registerAs } from '@nestjs/config';

export default registerAs('db', () => ({
  type: 'mysql',
  entities: ['dist/**/*.entity.js'],
  synchronize: true,
  host: 'mysql',
  port: '3306',
  username: 'root',
  database: 'wit',
  logging: 'all',
}));
