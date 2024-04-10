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

  /**
   * Create a new booking for a travel destination
   *
   * - Check if there are enough available seats for the booking otherwise return a BadRequestException
   * - Create a new booking and return it
   *
   * @param {BookingDto} createBooking
   * @returns {Promise<BadRequestException | PgInsertWithout<PgInsertBase<PgInsertBase<PgTable<{name: "booking", schema: undefined, columns: BuildColumns<"booking", {createdAt: PgTimestampStringBuilder<{name: "created_at", dataType: "string", columnType: "PgTimestampString", data: string, driverParam: string, enumValues: undefined}> & {_: {hasDefault: true}}, numSeats: PgIntegerBuilder<{name: "num_seats", dataType: "number", columnType: "PgInteger", data: number, driverParam: number | string, enumValues: undefined}> & {_: {notNull: true}}, userEmail: PgVarcharBuilder<{name: "user_email", dataType: "string", columnType: "PgVarchar", data: [string, ...string[]][number], driverParam: string, enumValues: [string, ...string[]]}> & {_: {notNull: true}}, id: PgUUIDBuilder & {_: {hasDefault: true}}, destinationId: PgUUIDBuilder<{name: "destination_id", dataType: "string", columnType: "PgUUID", data: string, driverParam: string, enumValues: undefined}> & {_: {notNull: true}}, confirmed: PgBooleanBuilder & {_: {notNull: true}}, expiresAt: PgTimestampStringBuilder<{name: "expires_at", dataType: "string", columnType: "PgTimestampString", data: string, driverParam: string, enumValues: undefined}> & {_: {hasDefault: true}}}, "pg">, dialect: "pg"}> & {createdAt: BuildColumn<"booking", PgTimestampStringBuilder<{name: "created_at", dataType: "string", columnType: "PgTimestampString", data: string, driverParam: string, enumValues: undefined}> & {_: {hasDefault: true}}, "pg">, numSeats: BuildColumn<"booking", PgIntegerBuilder<{name: "num_seats", dataType: "number", columnType: "PgInteger", data: number, driverParam: number | string, enumValues: undefined}> & {_: {notNull: true}}, "pg">, userEmail: BuildColumn<"booking", PgVarcharBuilder<{name: "user_email", dataType: "string", columnType: "PgVarchar", data: [string, ...string[]][number], driverParam: string, enumValues: [string, ...string[]]}> & {_: {notNull: true}}, "pg">, id: BuildColumn<"booking", PgUUIDBuilder & {_: {hasDefault: true}}, "pg">, destinationId: BuildColumn<"booking", PgUUIDBuilder<{name: "destination_id", dataType: "string", columnType: "PgUUID", data: string, driverParam: string, enumValues: undefined}> & {_: {notNull: true}}, "pg">, confirmed: BuildColumn<"booking", PgBooleanBuilder & {_: {notNull: true}}, "pg">, expiresAt: BuildColumn<"booking", PgTimestampStringBuilder<{name: "expires_at", dataType: "string", columnType: "PgTimestampString", data: string, driverParam: string, enumValues: undefined}> & {_: {hasDefault: true}}, "pg">}, PostgresJsQueryResultHKT>["_"]["table"], PgInsertBase<PgTable<{name: "booking", schema: undefined, columns: BuildColumns<"booking", {createdAt: PgTimestampStringBuilder<{name: "created_at", dataType: "string", columnType: "PgTimestampString", data: string, driverParam: string, enumValues: undefined}> & {_: {hasDefault: true}}, numSeats: PgIntegerBuilder<{name: "num_seats", dataType: "number", columnType: "PgInteger", data: number, driverParam: number | string, enumValues: undefined}> & {_: {notNull: true}}, userEmail: PgVarcharBuilder<{name: "user_email", dataType: "string", columnType: "PgVarchar", data: [string, ...string[]][number], driverParam: string, enumValues: [string, ...string[]]}> & {_: {notNull: true}}, id: PgUUIDBuilder & {_: {hasDefault: true}}, destinationId: PgUUIDBuilder<{name: "destination_id", dataType: "string", columnType: "PgUUID", data: string, driverParam: string, enumValues: undefined}> & {_: {notNull: true}}, confirmed: PgBooleanBuilder & {_: {notNull: true}}, expiresAt: PgTimestampStringBuilder<{name: "expires_at", dataType: "string", columnType: "PgTimestampString", data: string, driverParam: string, enumValues: undefined}> & {_: {hasDefault: true}}}, "pg">, dialect: "pg"}> & {createdAt: BuildColumn<"booking", PgTimestampStringBuilder<{name: "created_at", dataType: "string", columnType: "PgTimestampString", data: string, driverParam: string, enumValues: undefined}> & {_: {hasDefault: true}}, "pg">, numSeats: BuildColumn<"booking", PgIntegerBuilder<{name: "num_seats", dataType: "number", columnType: "PgInteger", data: number, driverParam: number | string, enumValues: undefined}> & {_: {notNull: true}}, "pg">, userEmail: BuildColumn<"booking", PgVarcharBuilder<{name: "user_email", dataType: "string", columnType: "PgVarchar", data: [string, ...string[]][number], driverParam: string, enumValues: [string, ...string[]]}> & {_: {notNull: true}}, "pg">, id: BuildColumn<"booking", PgUUIDBuilder & {_: {hasDefault: true}}, "pg">, destinationId: BuildColumn<"booking", PgUUIDBuilder<{name: "destination_id", dataType: "string", columnType: "PgUUID", data: string, driverParam: string, enumValues: undefined}> & {_: {notNull: true}}, "pg">, confirmed: BuildColumn<"booking", PgBooleanBuilder & {_: {notNull: true}}, "pg">, expiresAt: BuildColumn<"booking", PgTimestampStringBuilder<{name: "expires_at", dataType: "string", columnType: "PgTimestampString", data: string, driverParam: string, enumValues: undefined}> & {_: {hasDefault: true}}, "pg">}, PostgresJsQueryResultHKT>["_"]["queryResult"], PgInsertBase<PgTable<{name: "booking", schema: undefined, columns: BuildColumns<"booking", {createdAt: PgTimestampStringBuilder<{name: "created_at", dataType: "string", columnType: "PgTimestampString", data: string, driverParam: string, enumValues: undefined}> & {_: {hasDefault: true}}, numSeats: PgIntegerBuilder<{name: "num_seats", dataType: "number", columnType: "PgInteger", data: number, driverParam: number | string, enumValues: undefined}> & {_: {notNull: true}}, userEmail: PgVarcharBuilder<{name: "user_email", dataType: "string", columnType: "PgVarchar", data: [string, ...string[]][number], driverParam: string, enumValues: [string, ...string[]]}> & {_: {notNull: true}}, id: PgUUIDBuilder & {_: {hasDefault: true}}, destinationId: PgUUIDBuilder<{name: "destination_id", dataType: "string", columnType: "PgUUID", data: string, driverParam: string, enumValues: undefined}> & {_: {notNull: true}}, confirmed: PgBooleanBuilder & {_: {notNull: true}}, expiresAt: PgTimestampStringBuilder<{name: "expires_at", dataType: "string", columnType: "PgTimestampString", data: string, driverParam: string, enumValues: undefined}> & {_: {hasDefault: true}}}, "pg">, dialect: "pg"}> & {createdAt: BuildColumn<"booking", PgTimestampStringBuilder<{name: "created_at", dataType: "string", columnType: "PgTimestampString", data: string, driverParam: string, enumValues: undefined}> & {_: {hasDefault: true}}, "pg">, numSeats: BuildColumn<"booking", PgIntegerBuilder<{name: "num_seats", dataType: "number", columnType: "PgInteger", data: number, driverParam: number | string, enumValues: undefined}> & {_: {notNull: true}}, "pg">, userEmail: BuildColumn<"booking", PgVarcharBuilder<{name: "user_email", dataType: "string", columnType: "PgVarchar", data: [string, ...string[]][number], driverParam: string, enumValues: [string, ...string[]]}> & {_: {notNull: true}}, "pg">, id: BuildColumn<"booking", PgUUIDBuilder & {_: {hasDefault: true}}, "pg">, destinationId: BuildColumn<"booking", PgUUIDBuilder<{name: "destination_id", dataType: "string", columnType: "PgUUID", data: string, driverParam: string, enumValues: undefined}> & {_: {notNull: true}}, "pg">, confirmed: BuildColumn<"booking", PgBooleanBuilder & {_: {notNull: true}}, "pg">, expiresAt: BuildColumn<"booking", PgTimestampStringBuilder<{name: "expires_at", dataType: "string", columnType: "PgTimestampString", data: string, driverParam: string, enumValues: undefined}> & {_: {hasDefault: true}}, "pg">}, PostgresJsQueryResultHKT>["_"]["table"]["$inferSelect"], false, PgInsertBase<PgTable<{name: "booking", schema: undefined, columns: BuildColumns<"booking", {createdAt: PgTimestampStringBuilder<{name: "created_at", dataType: "string", columnType: "PgTimestampString", data: string, driverParam: string, enumValues: undefined}> & {_: {hasDefault: true}}, numSeats: PgIntegerBuilder<{name: "num_seats", dataType: "number", columnType: "PgInteger", data: number, driverParam: number | string, enumValues: undefined}> & {_: {notNull: true}}, userEmail: PgVarcharBuilder<{name: "user_email", dataType: "string", columnType: "PgVarchar", data: [string, ...string[]][number], driverParam: string, enumValues: [string, ...string[]]}> & {_: {notNull: true}}, id: PgUUIDBuilder & {_: {hasDefault: true}}, destinationId: PgUUIDBuilder<{name: "destination_id", dataType: "string", columnType: "PgUUID", data: string, driverParam: string, enumValues: undefined}> & {_: {notNull: true}}, confirmed: PgBooleanBuilder & {_: {notNull: true}}, expiresAt: PgTimestampStringBuilder<{name: "expires_at", dataType: "string", columnType: "PgTimestampString", data: string, driverParam: string, enumValues: undefined}> & {_: {hasDefault: true}}}, "pg">, dialect: "pg"}> & {createdAt: BuildColumn<"booking", PgTimestampStringBuilder<{name: "created_at", dataType: "string", columnType: "PgTimestampString", data: string, driverParam: string, enumValues: undefined}> & {_: {hasDefault: true}}, "pg">, numSeats: BuildColumn<"booking", PgIntegerBuilder<{name: "num_seats", dataType: "number", columnType: "PgInteger", data: number, driverParam: number | string, enumValues: undefined}> & {_: {notNull: true}}, "pg">, userEmail: BuildColumn<"booking", PgVarcharBuilder<{name: "user_email", dataType: "string", columnType: "PgVarchar", data: [string, ...string[]][number], driverParam: string, enumValues: [string, ...string[]]}> & {_: {notNull: true}}, "pg">, id: BuildColumn<"booking", PgUUIDBuilder & {_: {hasDefault: true}}, "pg">, destinationId: BuildColumn<"booking", PgUUIDBuilder<{name: "destination_id", dataType: "string", columnType: "PgUUID", data: string, driverParam: string, enumValues: undefined}> & {_: {notNull: true}}, "pg">, confirmed: BuildColumn<"booking", PgBooleanBuilder & {_: {notNull: true}}, "pg">, expiresAt: BuildColumn<"booking", PgTimestampStringBuilder<{name: "expires_at", dataType: "string", columnType: "PgTimestampString", data: string, driverParam: string, enumValues: undefined}> & {_: {hasDefault: true}}, "pg">}, PostgresJsQueryResultHKT>["_"]["excludedMethods"]>, false, "returning">>}
   */
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

  /**
   * Get all bookings
   *
   * - Retrieve all bookings from the database
   *
   * @returns {Promise<BadRequestException | SelectResult<GetSelectTableSelection<PgTable<{name: "booking", schema: undefined, columns: BuildColumns<"booking", {createdAt: PgTimestampStringBuilder<{name: "created_at", dataType: "string", columnType: "PgTimestampString", data: string, driverParam: string, enumValues: undefined}> & {_: {hasDefault: true}}, numSeats: PgIntegerBuilder<{name: "num_seats", dataType: "number", columnType: "PgInteger", data: number, driverParam: number | string, enumValues: undefined}> & {_: {notNull: true}}, userEmail: PgVarcharBuilder<{name: "user_email", dataType: "string", columnType: "PgVarchar", data: [string, ...string[]][number], driverParam: string, enumValues: [string, ...string[]]}> & {_: {notNull: true}}, id: PgUUIDBuilder & {_: {hasDefault: true}}, destinationId: PgUUIDBuilder<{name: "destination_id", dataType: "string", columnType: "PgUUID", data: string, driverParam: string, enumValues: undefined}> & {_: {notNull: true}}, confirmed: PgBooleanBuilder & {_: {notNull: true}}, expiresAt: PgTimestampStringBuilder<{name: "expires_at", dataType: "string", columnType: "PgTimestampString", data: string, driverParam: string, enumValues: undefined}> & {_: {hasDefault: true}}}, "pg">, dialect: "pg"}> & {createdAt: BuildColumn<"booking", PgTimestampStringBuilder<{name: "created_at", dataType: "string", columnType: "PgTimestampString", data: string, driverParam: string, enumValues: undefined}> & {_: {hasDefault: true}}, "pg">, numSeats: BuildColumn<"booking", PgIntegerBuilder<{name: "num_seats", dataType: "number", columnType: "PgInteger", data: number, driverParam: number | string, enumValues: undefined}> & {_: {notNull: true}}, "pg">, userEmail: BuildColumn<"booking", PgVarcharBuilder<{name: "user_email", dataType: "string", columnType: "PgVarchar", data: [string, ...string[]][number], driverParam: string, enumValues: [string, ...string[]]}> & {_: {notNull: true}}, "pg">, id: BuildColumn<"booking", PgUUIDBuilder & {_: {hasDefault: true}}, "pg">, destinationId: BuildColumn<"booking", PgUUIDBuilder<{name: "destination_id", dataType: "string", columnType: "PgUUID", data: string, driverParam: string, enumValues: undefined}> & {_: {notNull: true}}, "pg">, confirmed: BuildColumn<"booking", PgBooleanBuilder & {_: {notNull: true}}, "pg">, expiresAt: BuildColumn<"booking", PgTimestampStringBuilder<{name: "expires_at", dataType: "string", columnType: "PgTimestampString", data: string, driverParam: string, enumValues: undefined}> & {_: {hasDefault: true}}, "pg">}>, "single", "booking" extends string ? Record<"booking", "not-null"> : {}>[]>}
   */
  async findAll() {
    try {
      const bookings = await this.db.select().from(schema.Booking);
      return bookings;
    } catch (error) {
      return new BadRequestException(error);
    }
  }

  /**
   * Get Booking
   *
   * - Use the booking uuid to retrieve the booking from the database
   *
   * @param {string} id
   * @returns {Promise<BadRequestException | PgSelectWithout<PgSelectBase<"booking", GetSelectTableSelection<PgTable<{name: "booking", schema: undefined, columns: BuildColumns<"booking", {createdAt: PgTimestampStringBuilder<{name: "created_at", dataType: "string", columnType: "PgTimestampString", data: string, driverParam: string, enumValues: undefined}> & {_: {hasDefault: true}}, numSeats: PgIntegerBuilder<{name: "num_seats", dataType: "number", columnType: "PgInteger", data: number, driverParam: number | string, enumValues: undefined}> & {_: {notNull: true}}, userEmail: PgVarcharBuilder<{name: "user_email", dataType: "string", columnType: "PgVarchar", data: [string, ...string[]][number], driverParam: string, enumValues: [string, ...string[]]}> & {_: {notNull: true}}, id: PgUUIDBuilder & {_: {hasDefault: true}}, destinationId: PgUUIDBuilder<{name: "destination_id", dataType: "string", columnType: "PgUUID", data: string, driverParam: string, enumValues: undefined}> & {_: {notNull: true}}, confirmed: PgBooleanBuilder & {_: {notNull: true}}, expiresAt: PgTimestampStringBuilder<{name: "expires_at", dataType: "string", columnType: "PgTimestampString", data: string, driverParam: string, enumValues: undefined}> & {_: {hasDefault: true}}}, "pg">, dialect: "pg"}> & {createdAt: BuildColumn<"booking", PgTimestampStringBuilder<{name: "created_at", dataType: "string", columnType: "PgTimestampString", data: string, driverParam: string, enumValues: undefined}> & {_: {hasDefault: true}}, "pg">, numSeats: BuildColumn<"booking", PgIntegerBuilder<{name: "num_seats", dataType: "number", columnType: "PgInteger", data: number, driverParam: number | string, enumValues: undefined}> & {_: {notNull: true}}, "pg">, userEmail: BuildColumn<"booking", PgVarcharBuilder<{name: "user_email", dataType: "string", columnType: "PgVarchar", data: [string, ...string[]][number], driverParam: string, enumValues: [string, ...string[]]}> & {_: {notNull: true}}, "pg">, id: BuildColumn<"booking", PgUUIDBuilder & {_: {hasDefault: true}}, "pg">, destinationId: BuildColumn<"booking", PgUUIDBuilder<{name: "destination_id", dataType: "string", columnType: "PgUUID", data: string, driverParam: string, enumValues: undefined}> & {_: {notNull: true}}, "pg">, confirmed: BuildColumn<"booking", PgBooleanBuilder & {_: {notNull: true}}, "pg">, expiresAt: BuildColumn<"booking", PgTimestampStringBuilder<{name: "expires_at", dataType: "string", columnType: "PgTimestampString", data: string, driverParam: string, enumValues: undefined}> & {_: {hasDefault: true}}, "pg">}>, "single">, false, "where">>}
   */
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

  /**
   * Confirm a booking
   *
   * - Use the booking uuid to confirm that the booking has been paid and reserved
   * - Check if the booking has already been confirmed or if there are no available seats or if it is expired before confirming it
   *
   * @param {string} id
   * @returns {Promise<BadRequestException | PgSelectWithout<PgSelectBase<"booking", GetSelectTableSelection<PgTable<{name: "booking", schema: undefined, columns: BuildColumns<"booking", {createdAt: PgTimestampStringBuilder<{name: "created_at", dataType: "string", columnType: "PgTimestampString", data: string, driverParam: string, enumValues: undefined}> & {_: {hasDefault: true}}, numSeats: PgIntegerBuilder<{name: "num_seats", dataType: "number", columnType: "PgInteger", data: number, driverParam: number | string, enumValues: undefined}> & {_: {notNull: true}}, userEmail: PgVarcharBuilder<{name: "user_email", dataType: "string", columnType: "PgVarchar", data: [string, ...string[]][number], driverParam: string, enumValues: [string, ...string[]]}> & {_: {notNull: true}}, id: PgUUIDBuilder & {_: {hasDefault: true}}, destinationId: PgUUIDBuilder<{name: "destination_id", dataType: "string", columnType: "PgUUID", data: string, driverParam: string, enumValues: undefined}> & {_: {notNull: true}}, confirmed: PgBooleanBuilder & {_: {notNull: true}}, expiresAt: PgTimestampStringBuilder<{name: "expires_at", dataType: "string", columnType: "PgTimestampString", data: string, driverParam: string, enumValues: undefined}> & {_: {hasDefault: true}}}, "pg">, dialect: "pg"}> & {createdAt: BuildColumn<"booking", PgTimestampStringBuilder<{name: "created_at", dataType: "string", columnType: "PgTimestampString", data: string, driverParam: string, enumValues: undefined}> & {_: {hasDefault: true}}, "pg">, numSeats: BuildColumn<"booking", PgIntegerBuilder<{name: "num_seats", dataType: "number", columnType: "PgInteger", data: number, driverParam: number | string, enumValues: undefined}> & {_: {notNull: true}}, "pg">, userEmail: BuildColumn<"booking", PgVarcharBuilder<{name: "user_email", dataType: "string", columnType: "PgVarchar", data: [string, ...string[]][number], driverParam: string, enumValues: [string, ...string[]]}> & {_: {notNull: true}}, "pg">, id: BuildColumn<"booking", PgUUIDBuilder & {_: {hasDefault: true}}, "pg">, destinationId: BuildColumn<"booking", PgUUIDBuilder<{name: "destination_id", dataType: "string", columnType: "PgUUID", data: string, driverParam: string, enumValues: undefined}> & {_: {notNull: true}}, "pg">, confirmed: BuildColumn<"booking", PgBooleanBuilder & {_: {notNull: true}}, "pg">, expiresAt: BuildColumn<"booking", PgTimestampStringBuilder<{name: "expires_at", dataType: "string", columnType: "PgTimestampString", data: string, driverParam: string, enumValues: undefined}> & {_: {hasDefault: true}}, "pg">}>, "single">, false, "where">>}
   */
  async confirmOne(id: string) {
    try {
      const booking = await this.db
        .select()
        .from(schema.Booking)
        .where(eq(schema.Booking.id, id));

      const availableSeats = await this.db
        .select()
        .from(schema.AvailableSeats)
        .where(
          eq(
            schema.AvailableSeats.destinationId,
            booking[0]?.destinationId || '',
          ),
        );

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

      if (
        booking[0]?.expiresAt &&
        new Date(booking[0]?.expiresAt) < new Date()
      ) {
        return new BadRequestException({
          message:
            'Booking expired after 15 minutes. Please create a new booking',
        });
      }

      await this.db.transaction(async (tx) => {
        const bookingUpdated = await tx
          .update(schema.Booking)
          .set({ confirmed: true })
          .where(eq(schema.Booking.id, id))
          .returning();

        if (!bookingUpdated[0]) {
          return new BadRequestException({
            message: 'Booking not found',
          });
        }

        const availableSeatsUpdated = await tx
          .update(schema.AvailableSeats)
          .set({
            numSeatsAvailable: sql`${schema.AvailableSeats.numSeatsAvailable} - ${booking[0]?.numSeats}`,
          })
          .where(
            eq(
              schema.AvailableSeats.destinationId,
              booking[0]?.destinationId as string,
            ),
          )
          .returning();

        if (!availableSeatsUpdated[0]) {
          return new BadRequestException({
            message: 'Available Seats not found',
          });
        }
      });

      booking[0].confirmed = true;

      return booking;
    } catch (error) {
      return new BadRequestException(error);
    }
  }

  /**
   * Delete a booking
   *
   * - Use the booking uuid to delete the booking from the database
   * - If the booking is confirmed, update the available seats for the destination using a transaction
   *
   * @param {string} id
   * @returns {Promise<any>}
   */
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
