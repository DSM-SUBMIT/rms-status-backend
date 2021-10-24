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
import { recentStatus } from 'src/services/status/dto/response/recentStatus';
import { outageInfo } from 'src/services/status/dto/response/outageInfo';

export async function StatusController(fastify: FastifyInstance) {
  const service = Container.get(StatusService);

  fastify.get(
    '/',
    {
      schema: {
        tags: ['Status'],
        response: {
          200: {
            description: '요청 성공',
            type: 'object',
            properties: recentStatus,
          },
        },
      },
    },
    async (request, reply) => {
      return service.getStatus(fastify.db);
    },
  );

  fastify.post<{ Body: ReportOutage }>(
    '/',
    {
      schema: {
        tags: ['Status'],
        body: reportOutage,
        response: {
          204: {
            description: '요청 성공',
            type: 'null',
          },
        },
      },
    },
    async (request, reply) => {
      (await service.reportOutage(request, fastify.db))
        ? reply.status(204).send()
        : reply.status(503).send();
    },
  );

  fastify.get<{ Querystring: PeriodRequest }>(
    '/period',
    {
      schema: {
        tags: ['Status'],
        querystring: periodRequest,
        response: {
          200: {
            description: '요청 성공',
            type: 'array',
            items: outageInfo,
          },
        },
      },
    },
    async (request, reply) => {
      return await service.getSpecificPeriodOutages(request, fastify.db);
    },
  );
}
