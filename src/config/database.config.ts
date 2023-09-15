import { registerAs } from '@nestjs/config';

export default registerAs('db', () => ({
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 444a4852154455e1c2ae916c46ba06d2cc5f0cd1
  type: 'mysql',
  entities: ['dist/**/*.entity.js'],
  synchronize: true,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  logging: "all"
<<<<<<< HEAD
}));
=======
  type: 'postgres',
  entities: ['dist/**/*.entity.js'],
  synchronize: true,
  url: process.env.URL_DATABASE,
  logging: true,
}));
>>>>>>> database
=======
}));
>>>>>>> 444a4852154455e1c2ae916c46ba06d2cc5f0cd1
