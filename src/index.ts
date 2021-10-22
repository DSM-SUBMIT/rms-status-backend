import Fastify from 'fastify';

const fastify = Fastify({
  logger: true,
});

async function bootstrap() {
  try {
    await fastify.listen(+process.env.PORT!, '0.0.0.0');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}

bootstrap();
