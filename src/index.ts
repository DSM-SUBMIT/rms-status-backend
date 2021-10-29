import 'dotenv/config';
import 'reflect-metadata';
import Fastify from 'fastify';
import swagger from 'fastify-swagger';
import cors from 'fastify-cors';
import DatabaseConnector from 'src/utils/decorators/databaseConnector';
import { StatusController } from './controllers/status';

const fastify = Fastify({
  logger: {
    prettyPrint: {
      colorize: true,
    },
  },
});

fastify.register(cors);
fastify.register(DatabaseConnector);
fastify.register(swagger, {
  routePrefix: '/docs',
  swagger: {
    info: {
      title: 'RMS Status backend',
      description: 'Swagger document of RMS status backend',
      version: process.env.npm_package_version!,
    },
    host: 'status-api.dsm-rms.com',
    schemes: ['https'],
    consumes: ['application/json'],
    produces: ['application/json'],
    tags: [{ name: 'Status', description: '상태 정보 API' }],
  },
  uiConfig: {
    docExpansion: 'full',
    deepLinking: false,
  },
  staticCSP: true,
  exposeRoute: true,
});

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
