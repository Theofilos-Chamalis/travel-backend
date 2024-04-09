CREATE TABLE IF NOT EXISTS "available_seats" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"destination_id" uuid NOT NULL,
	"num_seats_available" integer DEFAULT 5 NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "booking" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"destination_id" uuid NOT NULL,
	"user_email" varchar NOT NULL,
	"num_seats" integer NOT NULL,
	"confirmed" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP,
	"expires_at" timestamp DEFAULT CURRENT_TIMESTAMP + INTERVAL '15 minutes'
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "destination" (
	"id" uuid PRIMARY KEY NOT NULL,
	"slug" varchar NOT NULL,
	"name" varchar NOT NULL,
	"description" varchar NOT NULL,
	"starting_date" date NOT NULL,
	"ending_date" date NOT NULL,
	"price" integer NOT NULL,
	"moods" jsonb NOT NULL,
	CONSTRAINT "destination_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "available_seats" ADD CONSTRAINT "available_seats_destination_id_destination_id_fk" FOREIGN KEY ("destination_id") REFERENCES "destination"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "booking" ADD CONSTRAINT "booking_destination_id_destination_id_fk" FOREIGN KEY ("destination_id") REFERENCES "destination"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
