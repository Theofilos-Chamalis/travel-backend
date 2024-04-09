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

export const Destination = pgTable('destination', {
  id: uuid('id').primaryKey().notNull(),
  slug: varchar('slug').unique().notNull(),
  name: varchar('name').notNull(),
  description: varchar('description').notNull(),
  startingDate: date('starting_date').notNull(),
  endingDate: date('ending_date').notNull(),
  price: integer('price').notNull(),
  moods: jsonb('moods').notNull(),
});

export const AvailableSeats = pgTable('available_seats', {
  id: uuid('id').primaryKey().defaultRandom(),
  destinationId: uuid('destination_id')
    .references(() => Destination.id)
    .notNull(),
  numSeatsAvailable: integer('num_seats_available').default(5).notNull(),
});

export const Booking = pgTable('booking', {
  id: uuid('id').primaryKey().defaultRandom(),
  destinationId: uuid('destination_id')
    .references(() => Destination.id)
    .notNull(),
  userEmail: varchar('user_email').notNull(),
  numSeats: integer('num_seats').notNull(),
  confirmed: boolean('confirmed').default(false).notNull(),
  createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`),
  expiresAt: timestamp('expires_at').default(
    sql`CURRENT_TIMESTAMP + INTERVAL '15 minutes'`,
  ),
});

export type DestinationSelected = typeof Destination.$inferSelect;
export type AvailableSeatsSelected = typeof AvailableSeats.$inferSelect;
export type BookingSelected = typeof Booking.$inferSelect;

export type DestinationAdded = typeof Destination.$inferInsert;
export type AvailableSeatsAdded = typeof AvailableSeats.$inferInsert;
export type BookingAdded = typeof Booking.$inferInsert;
