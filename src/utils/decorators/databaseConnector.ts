import fp from 'fastify-plugin';
import { createConnection } from 'typeorm';
import { connectionOptions } from 'src/shared/configs/databaseConnectionOptions';
import { Comment } from 'src/shared/entities/comment';
import { IssueReport } from 'src/shared/entities/issueReport';
import { Outage } from 'src/shared/entities/outage';

export default fp(async (fastify) => {
  try {
    const connectionOption = connectionOptions[process.env.NODE_ENV!];
    const connection = await createConnection(connectionOption);

    fastify.decorate('db', {
      comment: connection.getRepository(Comment),
      issueReport: connection.getRepository(IssueReport),
      outage: connection.getRepository(Outage),
    });
  } catch (err) {
    fastify.log.error(err);
  }
});
