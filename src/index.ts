import 'dotenv/config';
import 'reflect-metadata';
import Fastify from 'fastify';
import DatabaseConnector from 'src/utils/decorators/databaseConnector';
import { StatusController } from './controllers/status';

const fastify = Fastify({
  logger: {
    prettyPrint: {
      colorize: true,
    },
  },
});

fastify.register(DatabaseConnector);

fastify.register(StatusController, { prefix: '/status' });

async function bootstrap() {
  try {
    await fastify.listen(+process.env.PORT!, '0.0.0.0');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}

bootstrap();
