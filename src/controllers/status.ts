import { Container } from 'typedi';
import { FastifyInstance } from 'fastify';
import { StatusService } from 'src/services/status';

export async function StatusController(fastify: FastifyInstance) {
  const service = Container.get(StatusService);
  fastify.get('/', async (request, reply) => {
    return service.getStatus(fastify.db);
  });
}
