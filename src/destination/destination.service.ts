import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { DestinationDto } from './dto/destination.dto';
import { DrizzleAsyncProvider } from 'src/drizzle/drizzle.provider';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import * as schema from 'src/drizzle/schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class DestinationService {
  constructor(
    @Inject(DrizzleAsyncProvider) private db: PostgresJsDatabase<typeof schema>,
  ) {}
  async create(createDestination: DestinationDto) {
    try {
      let insertedDestination;

      await this.db.transaction(async (tx) => {
        insertedDestination = await tx
          .insert(schema.Destination)
          .values(createDestination)
          .returning();
        if (
          !insertedDestination ||
          insertedDestination.length === 0 ||
          !insertedDestination[0]?.id
        ) {
          return new BadRequestException({
            message: 'Failed to create destination',
          });
        }
        await tx.insert(schema.AvailableSeats).values({
          destinationId: insertedDestination[0].id,
        });
      });
      return insertedDestination;
    } catch (error) {
      return new BadRequestException(error);
    }
  }

  async findAll() {
    try {
      const destinations = await this.db.select().from(schema.Destination);
      return destinations;
    } catch (error) {
      return new BadRequestException(error);
    }
  }

  async findOne(id: string) {
    try {
      const destinations = await this.db
        .select()
        .from(schema.Destination)
        .where(eq(schema.Destination.id, id));
      return destinations;
    } catch (error) {
      return new BadRequestException(error);
    }
  }

  async remove(id: string) {
    try {
      let deletedDestination;
      await this.db.transaction(async (tx) => {
        await tx
          .delete(schema.AvailableSeats)
          .where(eq(schema.AvailableSeats.destinationId, id));
        await tx
          .delete(schema.Booking)
          .where(eq(schema.Booking.destinationId, id));
        deletedDestination = await tx
          .delete(schema.Destination)
          .where(eq(schema.Destination.id, id))
          .returning();
      });

      return deletedDestination;
    } catch (error) {
      return new BadRequestException(error);
    }
  }
}
