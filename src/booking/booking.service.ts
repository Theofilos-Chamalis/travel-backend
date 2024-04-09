import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { BookingDto } from './dto/booking.dto';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { DrizzleAsyncProvider } from 'src/drizzle/drizzle.provider';
import * as schema from 'src/drizzle/schema';
import { eq, sql } from 'drizzle-orm';

@Injectable()
export class BookingService {
  constructor(
    @Inject(DrizzleAsyncProvider) private db: PostgresJsDatabase<typeof schema>,
  ) {}
  async create(createBooking: BookingDto) {
    try {
      const availableSeats = await this.db
        .select()
        .from(schema.AvailableSeats)
        .where(
          eq(schema.AvailableSeats.destinationId, createBooking.destinationId),
        );

      if (
        (availableSeats[0]?.numSeatsAvailable ?? 0) < createBooking.numSeats
      ) {
        return new BadRequestException({
          message: 'Not enough available seats',
        });
      }

      const insertedBooking = await this.db
        .insert(schema.Booking)
        .values(createBooking)
        .returning();
      return insertedBooking;
    } catch (error) {
      return new BadRequestException(error);
    }
  }

  async findAll() {
    try {
      const bookings = await this.db.select().from(schema.Booking);
      return bookings;
    } catch (error) {
      return new BadRequestException(error);
    }
  }

  async findOne(id: string) {
    try {
      const bookings = await this.db
        .select()
        .from(schema.Booking)
        .where(eq(schema.Booking.id, id));
      return bookings;
    } catch (error) {
      return new BadRequestException(error);
    }
  }

  async confirmOne(id: string) {
    try {
      const booking = await this.db
        .select()
        .from(schema.Booking)
        .where(eq(schema.Booking.id, id));

      const availableSeats = await this.db
        .select()
        .from(schema.AvailableSeats)
        .where(eq(schema.AvailableSeats.destinationId, id));

      const availableSeatsNumber = availableSeats[0]?.numSeatsAvailable;
      const bookingSeatsNumber = booking[0]?.numSeats;

      if (
        !booking[0] ||
        !availableSeats[0] ||
        availableSeatsNumber === undefined ||
        bookingSeatsNumber === undefined
      ) {
        return new BadRequestException({
          message: 'Booking or Available Seats not found',
        });
      }

      if (availableSeatsNumber < bookingSeatsNumber) {
        return new BadRequestException({
          message: 'Not enough available seats',
        });
      }

      if (booking[0]?.confirmed) {
        return new BadRequestException({
          message: 'Booking already confirmed',
        });
      }

      await this.db.transaction(async (tx) => {
        await tx
          .update(schema.Booking)
          .set({ confirmed: true })
          .where(eq(schema.Booking.id, id));

        await tx
          .update(schema.AvailableSeats)
          .set({
            numSeatsAvailable: sql`${schema.AvailableSeats.numSeatsAvailable} - ${booking[0]?.numSeats}`,
          })
          .where(
            eq(
              schema.AvailableSeats.destinationId,
              booking[0]?.destinationId as string,
            ),
          );
      });

      booking[0].confirmed = true;

      return booking;
    } catch (error) {
      return new BadRequestException(error);
    }
  }

  async remove(id: string) {
    try {
      let deletedBooking;

      await this.db.transaction(async (tx) => {
        deletedBooking = await tx
          .delete(schema.Booking)
          .where(eq(schema.Booking.id, id))
          .returning();
        if (deletedBooking[0]?.confirmed) {
          await tx
            .update(schema.AvailableSeats)
            .set({
              numSeatsAvailable: sql`${schema.AvailableSeats.numSeatsAvailable} + ${deletedBooking[0]?.numSeats}`,
            })
            .where(
              eq(
                schema.AvailableSeats.destinationId,
                schema.Booking.destinationId,
              ),
            );
        }
      });

      return deletedBooking;
    } catch (error) {
      return new BadRequestException(error);
    }
  }
}
