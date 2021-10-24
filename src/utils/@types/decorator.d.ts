import fastify from 'fastify';
import { DatabaseConnection } from 'src/shared/interfaces/databaseConnection';

declare module 'fastify' {
  interface FastifyInstance {
    db: DatabaseConnection;
  }
}
