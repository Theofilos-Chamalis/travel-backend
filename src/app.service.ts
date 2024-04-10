import {
  Inject,
  Injectable,
  Logger,
  OnApplicationBootstrap,
} from '@nestjs/common';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { DrizzleAsyncProvider } from './drizzle/drizzle.provider';
import * as schema from 'src/drizzle/schema';
import { getConfig } from './utils/configuration';
import { readFileSync } from 'fs';
import { DestinationDto } from './destination/dto/destination.dto';

@Injectable()
export class AppService implements OnApplicationBootstrap {
  private logger: Logger = new Logger('Bootstrap');

  constructor(
    @Inject(DrizzleAsyncProvider) private db: PostgresJsDatabase<typeof schema>,
  ) {}
  getHealth(requestUrl: string | undefined, requestIp: string): string {
    return (
      'Server running. Request URL:' +
      (requestUrl || 'unknown') +
      ', Request IP ' +
      requestIp
    );
  }

  async onApplicationBootstrap(): Promise<void> {
    if (getConfig().server.isProduction) {
      return;
    }

    this.logger.debug('🚧 Bootstrapping application...');

    const existingDestinations = await this.db
      .select()
      .from(schema.Destination);

    if (existingDestinations.length > 0) {
      this.logger.debug(
        '⏩ Bootstrapping skipped as there are existing destinations',
      );
      return;
    }

    const destinationsSeed = readFileSync(
      './src/drizzle/seeds/travels.json',
      'utf8',
    );

    const destinationsSeedJson: DestinationDto[] = JSON.parse(destinationsSeed);

    if (!destinationsSeedJson || destinationsSeedJson.length === 0) {
      this.logger.debug('❌ Bootstrapping failed due to missing seed data');
      return;
    }

    const dbTransactionPromises = destinationsSeedJson.map(
      async (destination) => {
        this.db.transaction(async (tx) => {
          const insertedDestination = await tx
            .insert(schema.Destination)
            .values(destination)
            .returning();
          if (
            !insertedDestination ||
            insertedDestination.length === 0 ||
            !insertedDestination[0]?.id
          ) {
            this.logger.debug(
              `❌ Failed to create destination ${destination.name}`,
            );
            return;
          }
          await tx.insert(schema.AvailableSeats).values({
            destinationId: insertedDestination[0].id,
          });
        });
      },
    );

    await Promise.allSettled(dbTransactionPromises);
    this.logger.debug('✅ Bootstrapping application completed');
  }
}
