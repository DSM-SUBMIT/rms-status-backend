import Fastify from 'fastify';
import DatabaseConnector from 'src/utils/decorators/databaseConnector';

const fastify = Fastify({
  logger: true,
});

fastify.register(DatabaseConnector);

async function bootstrap() {
  try {
    await fastify.listen(3000);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}

bootstrap();
