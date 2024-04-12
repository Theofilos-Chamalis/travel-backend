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

  /**
   * Create a new destination
   *
   * - Create a new destination and the appropriate available seats record
   * - If the destination is not created, return a BadRequestException
   * - A transaction is used to ensure that both the destination and available seats are created together
   *
   * @param {DestinationDto} createDestination
   * @returns {Promise<any>}
   */
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

  /**
   * Get all destinations
   *
   * - Retrieve all destinations from the database
   *
   * @returns {Promise<BadRequestException | SelectResult<GetSelectTableSelection<PgTable<{name: "destination", schema: undefined, columns: BuildColumns<"destination", {endingDate: PgDateStringBuilder<{name: "ending_date", dataType: "string", columnType: "PgDateString", data: string, driverParam: string, enumValues: undefined}> & {_: {notNull: true}}, price: PgIntegerBuilder<{name: "price", dataType: "number", columnType: "PgInteger", data: number, driverParam: number | string, enumValues: undefined}> & {_: {notNull: true}}, name: PgVarcharBuilder<{name: "name", dataType: "string", columnType: "PgVarchar", data: [string, ...string[]][number], driverParam: string, enumValues: [string, ...string[]]}> & {_: {notNull: true}}, moods: PgJsonbBuilder<{name: "moods", dataType: "json", columnType: "PgJsonb", data: unknown, driverParam: unknown, enumValues: undefined}> & {_: {notNull: true}}, description: PgVarcharBuilder<{name: "description", dataType: "string", columnType: "PgVarchar", data: [string, ...string[]][number], driverParam: string, enumValues: [string, ...string[]]}> & {_: {notNull: true}}, id: PgUUIDBuilder & {_: {notNull: true}}, startingDate: PgDateStringBuilder<{name: "starting_date", dataType: "string", columnType: "PgDateString", data: string, driverParam: string, enumValues: undefined}> & {_: {notNull: true}}, slug: PgVarcharBuilder<{name: "slug", dataType: "string", columnType: "PgVarchar", data: [string, ...string[]][number], driverParam: string, enumValues: [string, ...string[]]}> & {_: {notNull: true}}}, "pg">, dialect: "pg"}> & {endingDate: BuildColumn<"destination", PgDateStringBuilder<{name: "ending_date", dataType: "string", columnType: "PgDateString", data: string, driverParam: string, enumValues: undefined}> & {_: {notNull: true}}, "pg">, price: BuildColumn<"destination", PgIntegerBuilder<{name: "price", dataType: "number", columnType: "PgInteger", data: number, driverParam: number | string, enumValues: undefined}> & {_: {notNull: true}}, "pg">, name: BuildColumn<"destination", PgVarcharBuilder<{name: "name", dataType: "string", columnType: "PgVarchar", data: [string, ...string[]][number], driverParam: string, enumValues: [string, ...string[]]}> & {_: {notNull: true}}, "pg">, moods: BuildColumn<"destination", PgJsonbBuilder<{name: "moods", dataType: "json", columnType: "PgJsonb", data: unknown, driverParam: unknown, enumValues: undefined}> & {_: {notNull: true}}, "pg">, description: BuildColumn<"destination", PgVarcharBuilder<{name: "description", dataType: "string", columnType: "PgVarchar", data: [string, ...string[]][number], driverParam: string, enumValues: [string, ...string[]]}> & {_: {notNull: true}}, "pg">, id: BuildColumn<"destination", PgUUIDBuilder & {_: {notNull: true}}, "pg">, startingDate: BuildColumn<"destination", PgDateStringBuilder<{name: "starting_date", dataType: "string", columnType: "PgDateString", data: string, driverParam: string, enumValues: undefined}> & {_: {notNull: true}}, "pg">, slug: BuildColumn<"destination", PgVarcharBuilder<{name: "slug", dataType: "string", columnType: "PgVarchar", data: [string, ...string[]][number], driverParam: string, enumValues: [string, ...string[]]}> & {_: {notNull: true}}, "pg">}>, "single", "destination" extends string ? Record<"destination", "not-null"> : {}>[]>}
   */
  async findAll() {
    try {
      const destinations = await this.db.select().from(schema.Destination);
      return destinations;
    } catch (error) {
      return new BadRequestException(error);
    }
  }

  /**
   * Get Destination
   *
   * - Use the UUID or slug of the destination to retrieve the destination from the database
   *
   * @param {string} idOrSlug
   * @returns {Promise<PgSelectWithout<PgSelectBase<"destination", GetSelectTableSelection<PgTable<{name: "destination", schema: undefined, columns: BuildColumns<"destination", {endingDate: PgDateStringBuilder<{name: "ending_date", dataType: "string", columnType: "PgDateString", data: string, driverParam: string, enumValues: undefined}> & {_: {notNull: true}}, price: PgIntegerBuilder<{name: "price", dataType: "number", columnType: "PgInteger", data: number, driverParam: number | string, enumValues: undefined}> & {_: {notNull: true}}, name: PgVarcharBuilder<{name: "name", dataType: "string", columnType: "PgVarchar", data: [string, ...string[]][number], driverParam: string, enumValues: [string, ...string[]]}> & {_: {notNull: true}}, moods: PgJsonbBuilder<{name: "moods", dataType: "json", columnType: "PgJsonb", data: unknown, driverParam: unknown, enumValues: undefined}> & {_: {notNull: true}}, description: PgVarcharBuilder<{name: "description", dataType: "string", columnType: "PgVarchar", data: [string, ...string[]][number], driverParam: string, enumValues: [string, ...string[]]}> & {_: {notNull: true}}, id: PgUUIDBuilder & {_: {notNull: true}}, startingDate: PgDateStringBuilder<{name: "starting_date", dataType: "string", columnType: "PgDateString", data: string, driverParam: string, enumValues: undefined}> & {_: {notNull: true}}, slug: PgVarcharBuilder<{name: "slug", dataType: "string", columnType: "PgVarchar", data: [string, ...string[]][number], driverParam: string, enumValues: [string, ...string[]]}> & {_: {notNull: true}}}, "pg">, dialect: "pg"}> & {endingDate: BuildColumn<"destination", PgDateStringBuilder<{name: "ending_date", dataType: "string", columnType: "PgDateString", data: string, driverParam: string, enumValues: undefined}> & {_: {notNull: true}}, "pg">, price: BuildColumn<"destination", PgIntegerBuilder<{name: "price", dataType: "number", columnType: "PgInteger", data: number, driverParam: number | string, enumValues: undefined}> & {_: {notNull: true}}, "pg">, name: BuildColumn<"destination", PgVarcharBuilder<{name: "name", dataType: "string", columnType: "PgVarchar", data: [string, ...string[]][number], driverParam: string, enumValues: [string, ...string[]]}> & {_: {notNull: true}}, "pg">, moods: BuildColumn<"destination", PgJsonbBuilder<{name: "moods", dataType: "json", columnType: "PgJsonb", data: unknown, driverParam: unknown, enumValues: undefined}> & {_: {notNull: true}}, "pg">, description: BuildColumn<"destination", PgVarcharBuilder<{name: "description", dataType: "string", columnType: "PgVarchar", data: [string, ...string[]][number], driverParam: string, enumValues: [string, ...string[]]}> & {_: {notNull: true}}, "pg">, id: BuildColumn<"destination", PgUUIDBuilder & {_: {notNull: true}}, "pg">, startingDate: BuildColumn<"destination", PgDateStringBuilder<{name: "starting_date", dataType: "string", columnType: "PgDateString", data: string, driverParam: string, enumValues: undefined}> & {_: {notNull: true}}, "pg">, slug: BuildColumn<"destination", PgVarcharBuilder<{name: "slug", dataType: "string", columnType: "PgVarchar", data: [string, ...string[]][number], driverParam: string, enumValues: [string, ...string[]]}> & {_: {notNull: true}}, "pg">}>, "single">, false, "where"> | BadRequestException>}
   */
  async findOne(idOrSlug: string) {
    try {
      const isUUID =
        idOrSlug &&
        idOrSlug.match(
          /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
        );

      let destinations = [];
      if (isUUID) {
        destinations = await this.db
          .select()
          .from(schema.Destination)
          .where(eq(schema.Destination.id, idOrSlug));
      } else {
        destinations = await this.db
          .select()
          .from(schema.Destination)
          .where(eq(schema.Destination.slug, idOrSlug));
      }

      return destinations;
    } catch (error) {
      return new BadRequestException(error);
    }
  }

  /**
   * Delete a destination
   *
   * - Delete a destination based on its UUID and the associated available seats and bookings for it
   * - A transaction is used to ensure that all records are deleted together
   * - The destination is deleted after the available seats and bookings are deleted
   *
   * @param {string} id
   * @returns {Promise<any>}
   */
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
