import { relations } from 'drizzle-orm';
import { sql } from 'drizzle-orm';
import {
  pgTable,
  uuid,
  varchar,
  integer,
  date,
  boolean,
  timestamp,
  jsonb,
} from 'drizzle-orm/pg-core';

/**
 * Destination(Travel) table
 *
 * - Stores all necessary information about a travel destination
 * - moods is a JSONB column to store the moods of the destination. It is used to showcase the use of JSON fields in Postgres to have a flexible schema if needed and avoid the need for a separate table
 *
 * @type {PgTableWithColumns<{name: "destination", schema: undefined, columns: BuildColumns<"destination", {endingDate: PgDateStringBuilder<{name: "ending_date", dataType: "string", columnType: "PgDateString", data: string, driverParam: string, enumValues: undefined}> & {_: {notNull: true}}, price: PgIntegerBuilder<{name: "price", dataType: "number", columnType: "PgInteger", data: number, driverParam: number | string, enumValues: undefined}> & {_: {notNull: true}}, name: PgVarcharBuilder<{name: "name", dataType: "string", columnType: "PgVarchar", data: [string, ...string[]][number], driverParam: string, enumValues: [string, ...string[]]}> & {_: {notNull: true}}, moods: PgJsonbBuilder<{name: "moods", dataType: "json", columnType: "PgJsonb", data: unknown, driverParam: unknown, enumValues: undefined}> & {_: {notNull: true}}, description: PgVarcharBuilder<{name: "description", dataType: "string", columnType: "PgVarchar", data: [string, ...string[]][number], driverParam: string, enumValues: [string, ...string[]]}> & {_: {notNull: true}}, id: PgUUIDBuilder & {_: {notNull: true}}, startingDate: PgDateStringBuilder<{name: "starting_date", dataType: "string", columnType: "PgDateString", data: string, driverParam: string, enumValues: undefined}> & {_: {notNull: true}}, slug: PgVarcharBuilder<{name: "slug", dataType: "string", columnType: "PgVarchar", data: [string, ...string[]][number], driverParam: string, enumValues: [string, ...string[]]}> & {_: {notNull: true}}}, "pg">, dialect: "pg"}>}
 */
export const Destination = pgTable('destination', {
  id: uuid('id').primaryKey().notNull(),
  slug: varchar('slug', { length: 256 }).unique().notNull(),
  name: varchar('name', { length: 128 }).notNull(),
  description: varchar('description').notNull(),
  startingDate: date('starting_date').notNull(),
  endingDate: date('ending_date').notNull(),
  price: integer('price').notNull(),
  moods: jsonb('moods').notNull(),
});

/**
 * AvailableSeats table
 *
 * - Stores the number of available seats for a travel destination
 * - destinationId is a foreign key to the Destination table
 * - numSeatsAvailable is the number of available seats for the destination (default is 5)
 *
 * @type {PgTableWithColumns<{name: "available_seats", schema: undefined, columns: BuildColumns<"available_seats", {numSeatsAvailable: PgIntegerBuilder & {_: {notNull: true}}, id: PgUUIDBuilder & {_: {hasDefault: true}}, destinationId: PgUUIDBuilder<{name: "destination_id", dataType: "string", columnType: "PgUUID", data: string, driverParam: string, enumValues: undefined}> & {_: {notNull: true}}}, "pg">, dialect: "pg"}>}
 */
export const AvailableSeats = pgTable('available_seats', {
  id: uuid('id').primaryKey().defaultRandom(),
  destinationId: uuid('destination_id')
    .references(() => Destination.id)
    .notNull(),
  numSeatsAvailable: integer('num_seats_available').default(5).notNull(),
});

/**
 * Booking table
 *
 * - Stores the booking information for a user about a travel destination. Multiple bookings can be made for the same destination if there are available seats
 * - destinationId is a foreign key to the Destination table
 * - expiresAt is the timestamp when the booking expires (default is 15 minutes from the creation time of the booking)
 * - confirmed is a boolean to indicate if the booking is confirmed or not (default is false)
 *
 * @type {PgTableWithColumns<{name: "booking", schema: undefined, columns: BuildColumns<"booking", {createdAt: PgTimestampStringBuilder<{name: "created_at", dataType: "string", columnType: "PgTimestampString", data: string, driverParam: string, enumValues: undefined}> & {_: {hasDefault: true}}, numSeats: PgIntegerBuilder<{name: "num_seats", dataType: "number", columnType: "PgInteger", data: number, driverParam: number | string, enumValues: undefined}> & {_: {notNull: true}}, userEmail: PgVarcharBuilder<{name: "user_email", dataType: "string", columnType: "PgVarchar", data: [string, ...string[]][number], driverParam: string, enumValues: [string, ...string[]]}> & {_: {notNull: true}}, id: PgUUIDBuilder & {_: {hasDefault: true}}, destinationId: PgUUIDBuilder<{name: "destination_id", dataType: "string", columnType: "PgUUID", data: string, driverParam: string, enumValues: undefined}> & {_: {notNull: true}}, confirmed: PgBooleanBuilder & {_: {notNull: true}}, expiresAt: PgTimestampStringBuilder<{name: "expires_at", dataType: "string", columnType: "PgTimestampString", data: string, driverParam: string, enumValues: undefined}> & {_: {hasDefault: true}}}, "pg">, dialect: "pg"}>}
 */
export const Booking = pgTable('booking', {
  id: uuid('id').primaryKey().defaultRandom(),
  destinationId: uuid('destination_id')
    .references(() => Destination.id)
    .notNull(),
  userEmail: varchar('user_email', { length: 256 }).notNull(),
  numSeats: integer('num_seats').notNull(),
  confirmed: boolean('confirmed').default(false).notNull(),
  createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`),
  expiresAt: timestamp('expires_at').default(
    sql`CURRENT_TIMESTAMP + INTERVAL '15 minutes'`,
  ),
});

/**
 * Destination Table Relations
 *
 * - One to One relation with AvailableSeats table
 * - One to Many relation with Booking table
 */
export const DestinationRelations = relations(Destination, ({ one, many }) => ({
  availableSeats: one(AvailableSeats),
  booking: many(Booking),
}));

/**
 * Booking Table Relations
 *
 * - Many to One relation with Destination table
 */
export const BookingRelations = relations(Booking, ({ one }) => ({
  destination: one(Destination, {
    fields: [Booking.destinationId],
    references: [Destination.id],
  }),
}));

export type DestinationSelected = typeof Destination.$inferSelect;
export type AvailableSeatsSelected = typeof AvailableSeats.$inferSelect;
export type BookingSelected = typeof Booking.$inferSelect;

export type DestinationAdded = typeof Destination.$inferInsert;
export type AvailableSeatsAdded = typeof AvailableSeats.$inferInsert;
export type BookingAdded = typeof Booking.$inferInsert;
