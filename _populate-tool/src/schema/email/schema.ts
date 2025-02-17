import { pgTable, integer, varchar, text } from "drizzle-orm/pg-core";
import { collection } from "../collection";
import { library } from "../library";
import { room } from "../room";

export const email = pgTable("email", {
	email: varchar("email", { length: 100 }).notNull().primaryKey(),
	description_email: text("description_email"),
});

export const email_library = pgTable("email_library", {
	email: varchar("email", { length: 20 })
		.notNull()
		.primaryKey()
		.references(() => email.email),
	id_library: integer("id_library")
		.notNull()
		.references(() => library.id_library),
});

export const email_room = pgTable("email_room", {
	email: varchar("email", { length: 20 })
		.notNull()
		.primaryKey()
		.references(() => email.email), //'%_@__%.__%'
	id_room: varchar("id_room", { length: 20 })
		.notNull()
		.references(() => room.id_room),
});

export const email_collection = pgTable("email_collection", {
	email: varchar("email", { length: 20 })
		.notNull()
		.primaryKey()
		.references(() => email.email), //'%_@__%.__%'
	id_collection: varchar("id_collection", { length: 10 })
		.notNull()
		.references(() => collection.id_collection),
});
