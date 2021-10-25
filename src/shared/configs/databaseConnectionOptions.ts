import 'dotenv/config';
import { ConnectionOptions } from 'typeorm';
import { Comment } from '../entities/comment';
import { IssueReport } from '../entities/issueReport';
import { Outage } from '../entities/outage';

export const connectionOptions: { [key: string]: ConnectionOptions } = {
  development: {
    type: 'postgres',
    host: process.env.DEV_DB_HOST,
    port: +process.env.DEV_DB_PORT!,
    username: process.env.DEV_DB_USERNAME,
    password: process.env.DEV_DB_PASSWORD,
    database: process.env.DEV_DB_DATABASE,
    entities: [Comment, IssueReport, Outage],
    synchronize: true,
    logging: true,
  },
  production: {
    type: 'mysql',
    host: process.env.PROD_DB_HOST,
    port: +process.env.PROD_DB_PORT!,
    username: process.env.PROD_DB_USERNAME,
    password: process.env.PROD_DB_PASSWORD,
    database: process.env.PROD_DB_DATABASE,
    entities: [Comment, IssueReport, Outage],
    synchronize: false,
    logging: false,
  },
};
