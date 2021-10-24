import { Container } from 'typedi';
import { FastifyInstance } from 'fastify';
import { StatusService } from 'src/services/status';
import {
  ReportOutage,
  reportOutage,
} from 'src/services/status/dto/request/reportOutage';
import {
  periodRequest,
  PeriodRequest,
} from 'src/services/status/dto/request/getSpecificPeriodOutages';

export async function StatusController(fastify: FastifyInstance) {
  const service = Container.get(StatusService);

  fastify.get('/', async (request, reply) => {
    return service.getStatus(fastify.db);
  });

  fastify.post<{ Body: ReportOutage }>(
    '/',
    { schema: { body: reportOutage } },
    async (request, reply) => {
      (await service.reportOutage(request, fastify.db))
        ? reply.status(204).send()
        : reply.status(503).send();
    },
  );

  fastify.get<{ Querystring: PeriodRequest }>(
    '/period',
    { schema: { querystring: periodRequest } },
    async (request, reply) => {
      return await service.getSpecificPeriodOutages(request, fastify.db);
    },
  );
}