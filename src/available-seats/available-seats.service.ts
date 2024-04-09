import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { AvailableSeatsDto } from './dto/available-seats.dto';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { DrizzleAsyncProvider } from 'src/drizzle/drizzle.provider';
import * as schema from 'src/drizzle/schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class AvailableSeatsService {
  constructor(
    @Inject(DrizzleAsyncProvider) private db: PostgresJsDatabase<typeof schema>,
  ) {}
  async create(createAvailableSeats: AvailableSeatsDto) {
    try {
      const insertedAvailableSeats = await this.db
        .insert(schema.AvailableSeats)
        .values(createAvailableSeats)
        .returning();
      return insertedAvailableSeats;
    } catch (error) {
      return new BadRequestException(error);
    }
  }

  async findAll() {
    try {
      const availableSeats = await this.db.select().from(schema.AvailableSeats);
      return availableSeats;
    } catch (error) {
      return new BadRequestException(error);
    }
  }

  async findOne(id: string) {
    try {
      const availableSeats = await this.db
        .select()
        .from(schema.AvailableSeats)
        .where(eq(schema.AvailableSeats.id, id));
      return availableSeats;
    } catch (error) {
      return new BadRequestException(error);
    }
  }

  async update(id: string, updateAvailableSeats: AvailableSeatsDto) {
    try {
      const updatedAvailableSeats = await this.db
        .update(schema.AvailableSeats)
        .set(updateAvailableSeats)
        .where(eq(schema.AvailableSeats.id, id))
        .returning();
      return updatedAvailableSeats;
    } catch (error) {
      return new BadRequestException(error);
    }
  }

  async remove(id: string) {
    try {
      const deletedAvailableSeats = await this.db
        .delete(schema.AvailableSeats)
        .where(eq(schema.AvailableSeats.id, id))
        .returning();
      return deletedAvailableSeats;
    } catch (error) {
      return new BadRequestException(error);
    }
  }
}
