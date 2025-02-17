import { pgTable, text, varchar, serial } from "drizzle-orm/pg-core";

export const library = pgTable("library", {
	id_library: serial("id_library").primaryKey(),
	name_library: varchar("name_library", { length: 255 }).unique().notNull(),
	location_library: varchar("location_library", { length: 255 }).notNull(),
	description_library: text("description_library"),
	website: varchar("website", { length: 255 }),
});

