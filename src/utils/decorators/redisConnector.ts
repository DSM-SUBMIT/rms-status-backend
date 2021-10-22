import fp from 'fastify-plugin';
import redis from 'redis';

export default fp(async (fastify) => {
  try {
    const client = redis.createClient();
    fastify.decorate('redis', client);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});
