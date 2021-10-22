import 'dotenv/config';
import { ConnectionOptions } from 'typeorm';

export const connectionOptions: { [key: string]: ConnectionOptions } = {
  development: {
    type: 'postgres',
    host: process.env.DEV_DB_HOST,
    port: +process.env.DEV_DB_PORT!,
    username: process.env.DEV_DB_USERNAME,
    password: process.env.DEV_DB_PASSWORD,
    database: process.env.DEV_DB_DATABASE,
    synchronize: true,
    logging: true,
  },
  production: {
    type: 'postgres',
    host: process.env.PROD_DB_HOST,
    port: +process.env.PROD_DB_PORT!,
    username: process.env.PROD_DB_USERNAME,
    password: process.env.PROD_DB_PASSWORD,
    database: process.env.PROD_DB_DATABASE,
    synchronize: false,
    logging: false,
  },
};
