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

  /**
   * Create a new available seats record for a destination
   *
   * @param {AvailableSeatsDto} createAvailableSeats
   * @returns {Promise<BadRequestException | PgInsertWithout<PgInsertBase<PgInsertBase<PgTable<{name: "available_seats", schema: undefined, columns: BuildColumns<"available_seats", {numSeatsAvailable: PgIntegerBuilder & {_: {notNull: true}}, id: PgUUIDBuilder & {_: {hasDefault: true}}, destinationId: PgUUIDBuilder<{name: "destination_id", dataType: "string", columnType: "PgUUID", data: string, driverParam: string, enumValues: undefined}> & {_: {notNull: true}}}, "pg">, dialect: "pg"}> & {numSeatsAvailable: BuildColumn<"available_seats", PgIntegerBuilder & {_: {notNull: true}}, "pg">, id: BuildColumn<"available_seats", PgUUIDBuilder & {_: {hasDefault: true}}, "pg">, destinationId: BuildColumn<"available_seats", PgUUIDBuilder<{name: "destination_id", dataType: "string", columnType: "PgUUID", data: string, driverParam: string, enumValues: undefined}> & {_: {notNull: true}}, "pg">}, PostgresJsQueryResultHKT>["_"]["table"], PgInsertBase<PgTable<{name: "available_seats", schema: undefined, columns: BuildColumns<"available_seats", {numSeatsAvailable: PgIntegerBuilder & {_: {notNull: true}}, id: PgUUIDBuilder & {_: {hasDefault: true}}, destinationId: PgUUIDBuilder<{name: "destination_id", dataType: "string", columnType: "PgUUID", data: string, driverParam: string, enumValues: undefined}> & {_: {notNull: true}}}, "pg">, dialect: "pg"}> & {numSeatsAvailable: BuildColumn<"available_seats", PgIntegerBuilder & {_: {notNull: true}}, "pg">, id: BuildColumn<"available_seats", PgUUIDBuilder & {_: {hasDefault: true}}, "pg">, destinationId: BuildColumn<"available_seats", PgUUIDBuilder<{name: "destination_id", dataType: "string", columnType: "PgUUID", data: string, driverParam: string, enumValues: undefined}> & {_: {notNull: true}}, "pg">}, PostgresJsQueryResultHKT>["_"]["queryResult"], PgInsertBase<PgTable<{name: "available_seats", schema: undefined, columns: BuildColumns<"available_seats", {numSeatsAvailable: PgIntegerBuilder & {_: {notNull: true}}, id: PgUUIDBuilder & {_: {hasDefault: true}}, destinationId: PgUUIDBuilder<{name: "destination_id", dataType: "string", columnType: "PgUUID", data: string, driverParam: string, enumValues: undefined}> & {_: {notNull: true}}}, "pg">, dialect: "pg"}> & {numSeatsAvailable: BuildColumn<"available_seats", PgIntegerBuilder & {_: {notNull: true}}, "pg">, id: BuildColumn<"available_seats", PgUUIDBuilder & {_: {hasDefault: true}}, "pg">, destinationId: BuildColumn<"available_seats", PgUUIDBuilder<{name: "destination_id", dataType: "string", columnType: "PgUUID", data: string, driverParam: string, enumValues: undefined}> & {_: {notNull: true}}, "pg">}, PostgresJsQueryResultHKT>["_"]["table"]["$inferSelect"], false, PgInsertBase<PgTable<{name: "available_seats", schema: undefined, columns: BuildColumns<"available_seats", {numSeatsAvailable: PgIntegerBuilder & {_: {notNull: true}}, id: PgUUIDBuilder & {_: {hasDefault: true}}, destinationId: PgUUIDBuilder<{name: "destination_id", dataType: "string", columnType: "PgUUID", data: string, driverParam: string, enumValues: undefined}> & {_: {notNull: true}}}, "pg">, dialect: "pg"}> & {numSeatsAvailable: BuildColumn<"available_seats", PgIntegerBuilder & {_: {notNull: true}}, "pg">, id: BuildColumn<"available_seats", PgUUIDBuilder & {_: {hasDefault: true}}, "pg">, destinationId: BuildColumn<"available_seats", PgUUIDBuilder<{name: "destination_id", dataType: "string", columnType: "PgUUID", data: string, driverParam: string, enumValues: undefined}> & {_: {notNull: true}}, "pg">}, PostgresJsQueryResultHKT>["_"]["excludedMethods"]>, false, "returning">>}
   */
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

  /**
   * Get all available seats records
   *
   * - Retrieve all available seats records from the database
   *
   * @returns {Promise<BadRequestException | SelectResult<GetSelectTableSelection<PgTable<{name: "available_seats", schema: undefined, columns: BuildColumns<"available_seats", {numSeatsAvailable: PgIntegerBuilder & {_: {notNull: true}}, id: PgUUIDBuilder & {_: {hasDefault: true}}, destinationId: PgUUIDBuilder<{name: "destination_id", dataType: "string", columnType: "PgUUID", data: string, driverParam: string, enumValues: undefined}> & {_: {notNull: true}}}, "pg">, dialect: "pg"}> & {numSeatsAvailable: BuildColumn<"available_seats", PgIntegerBuilder & {_: {notNull: true}}, "pg">, id: BuildColumn<"available_seats", PgUUIDBuilder & {_: {hasDefault: true}}, "pg">, destinationId: BuildColumn<"available_seats", PgUUIDBuilder<{name: "destination_id", dataType: "string", columnType: "PgUUID", data: string, driverParam: string, enumValues: undefined}> & {_: {notNull: true}}, "pg">}>, "single", "available_seats" extends string ? Record<"available_seats", "not-null"> : {}>[]>}
   */
  async findAll() {
    try {
      const availableSeats = await this.db.select().from(schema.AvailableSeats);
      return availableSeats;
    } catch (error) {
      return new BadRequestException(error);
    }
  }

  /**
   * Get a single available seats record
   *
   * - Use the uuid to retrieve a single available seats record from the database
   *
   * @param {string} id
   * @returns {Promise<PgSelectWithout<PgSelectBase<"available_seats", GetSelectTableSelection<PgTable<{name: "available_seats", schema: undefined, columns: BuildColumns<"available_seats", {numSeatsAvailable: PgIntegerBuilder & {_: {notNull: true}}, id: PgUUIDBuilder & {_: {hasDefault: true}}, destinationId: PgUUIDBuilder<{name: "destination_id", dataType: "string", columnType: "PgUUID", data: string, driverParam: string, enumValues: undefined}> & {_: {notNull: true}}}, "pg">, dialect: "pg"}> & {numSeatsAvailable: BuildColumn<"available_seats", PgIntegerBuilder & {_: {notNull: true}}, "pg">, id: BuildColumn<"available_seats", PgUUIDBuilder & {_: {hasDefault: true}}, "pg">, destinationId: BuildColumn<"available_seats", PgUUIDBuilder<{name: "destination_id", dataType: "string", columnType: "PgUUID", data: string, driverParam: string, enumValues: undefined}> & {_: {notNull: true}}, "pg">}>, "single">, false, "where"> | BadRequestException>}
   */
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

  /**
   * Update an available seats record
   *
   * @param {string} id
   * @param {AvailableSeatsDto} updateAvailableSeats
   * @returns {Promise<BadRequestException | PgUpdateReturningAll<PgUpdateWithout<PgUpdateBase<PgTable<{name: "available_seats", schema: undefined, columns: BuildColumns<"available_seats", {numSeatsAvailable: PgIntegerBuilder & {_: {notNull: true}}, id: PgUUIDBuilder & {_: {hasDefault: true}}, destinationId: PgUUIDBuilder<{name: "destination_id", dataType: "string", columnType: "PgUUID", data: string, driverParam: string, enumValues: undefined}> & {_: {notNull: true}}}, "pg">, dialect: "pg"}> & {numSeatsAvailable: BuildColumn<"available_seats", PgIntegerBuilder & {_: {notNull: true}}, "pg">, id: BuildColumn<"available_seats", PgUUIDBuilder & {_: {hasDefault: true}}, "pg">, destinationId: BuildColumn<"available_seats", PgUUIDBuilder<{name: "destination_id", dataType: "string", columnType: "PgUUID", data: string, driverParam: string, enumValues: undefined}> & {_: {notNull: true}}, "pg">}, PostgresJsQueryResultHKT>, false, "where">, false>>}
   */
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

  /**
   * Delete an available seats record
   *
   * - Delete an available seats record based on its UUID
   *
   * @param {string} id
   * @returns {Promise<PgDeleteReturningAll<PgDeleteWithout<PgDeleteBase<PgTable<{name: "available_seats", schema: undefined, columns: BuildColumns<"available_seats", {numSeatsAvailable: PgIntegerBuilder & {_: {notNull: true}}, id: PgUUIDBuilder & {_: {hasDefault: true}}, destinationId: PgUUIDBuilder<{name: "destination_id", dataType: "string", columnType: "PgUUID", data: string, driverParam: string, enumValues: undefined}> & {_: {notNull: true}}}, "pg">, dialect: "pg"}> & {numSeatsAvailable: BuildColumn<"available_seats", PgIntegerBuilder & {_: {notNull: true}}, "pg">, id: BuildColumn<"available_seats", PgUUIDBuilder & {_: {hasDefault: true}}, "pg">, destinationId: BuildColumn<"available_seats", PgUUIDBuilder<{name: "destination_id", dataType: "string", columnType: "PgUUID", data: string, driverParam: string, enumValues: undefined}> & {_: {notNull: true}}, "pg">}, PostgresJsQueryResultHKT>, false, "where">, false> | BadRequestException>}
   */
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
