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
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

/**
 * Bootstrap the application
 * - Use the performance API to measure the time it takes to bootstrap the application
 * - Use the FastifyAdapter to create the application
 * - useHTTPS if the server is in production and the configuration is set to use HTTPS
 * - Register the compression and helmet plugins and enable CORS
 * - Serve an OpenAPI (Swagger) documentation if the server is not in production
 *
 * @returns {Promise<void>}
 */
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
    serverConfiguration.isProduction ? app.register(helmet) : [],
  ]);
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );

  if (!serverConfiguration.isProduction) {
    const config = new DocumentBuilder()
      .setTitle('Travel Backend')
      .setDescription('The REST API for the travel backend')
      .setVersion('0.0.1')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('swagger', app, document);
  }

  await app.listen(serverConfiguration.port, '0.0.0.0');

  const bootstrapDuration =
    Math.floor(((performance.now() - bootstrapStartTimestamp) * 100) / 1000) /
    100;

  Logger.debug(
    `💻 Listening at ${serverConfiguration.serverUrl}:${serverConfiguration.port} in ${bootstrapDuration}s`,
    'Startup',
  );
}

bootstrap();
