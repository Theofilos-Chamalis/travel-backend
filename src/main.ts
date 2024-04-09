import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { Logger, ValidationPipe } from '@nestjs/common';
import { getConfig } from './utils/configuration';
import { readFileSync } from 'fs';
import compression from '@fastify/compress';
import helmet from '@fastify/helmet';
import { constants } from 'zlib';

async function bootstrap() {
  const bootstrapStartTimestamp = performance.now();
  const serverConfiguration = getConfig().server;
  const useHttps =
    serverConfiguration.isProduction && serverConfiguration.https;

  let fastifyAdapter = new FastifyAdapter();

  if (useHttps) {
    fastifyAdapter = new FastifyAdapter({
      https: {
        key: readFileSync(
          serverConfiguration.certificatesPath + '/privkey.pem',
          'utf8',
        ),
        cert: readFileSync(
          serverConfiguration.certificatesPath + '/fullchain.pem',
          'utf8',
        ),
      },
    });
  }

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    fastifyAdapter,
  );

  await Promise.all([
    app.register(compression, {
      brotliOptions: {
        [constants.BROTLI_PARAM_QUALITY]: 3,
      },
    }),
    app.register(helmet),
  ]);
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );

  await app.listen(serverConfiguration.port, '0.0.0.0');

  const bootstrapDuration =
    Math.floor(((performance.now() - bootstrapStartTimestamp) * 100) / 1000) /
    100;

  Logger.debug(
    `💻 Listening at ${serverConfiguration.serverUrl}:${serverConfiguration.port} in ${bootstrapDuration}s`,
  );
}

bootstrap();
