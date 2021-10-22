import fp from 'fastify-plugin';
import * as redis from 'redis';

export default fp(async (fastify) => {
  try {
    const client = redis.createClient({
      host: process.env.REDIS_HOST,
      port: +process.env.REDIS_PORT!,
    });
    fastify.decorate('redis', client);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});
