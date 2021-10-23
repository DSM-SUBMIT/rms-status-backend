import fastify from 'fastify';
import { Comment } from 'src/shared/entities/comment';
import { IssueReport } from 'src/shared/entities/issueReport';
import { Outage } from 'src/shared/entities/outage';
import { RedisClient } from 'redis';
import { Repository } from 'typeorm';
import { DatabaseConnection } from 'src/shared/interfaces/databaseConnection';

declare module 'fastify' {
  export interface FastifyInstance<
    HttpServer = Server,
    HttpRequest = IncomingMessage,
    HttpResponse = ServerResponse,
  > {
    db: DatabaseConnection;
  }
}
