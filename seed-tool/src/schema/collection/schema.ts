import { pgEnum, pgTable, text, varchar } from "drizzle-orm/pg-core";
import { room } from "../room";

export const collection_type = pgEnum("type_collection", [
	"special",
	"general",
]);

export const collection = pgTable("collection", {
	id_collection: varchar("id_collection", { length: 10 }).primaryKey(),
	id_room: varchar("id_room", { length: 20 }).references(() => room.id_room),
	name_collection: varchar("name_collection", { length: 255 })
		.unique()
		.notNull(),
	description_collection: text("description_collection"),
	type_collection: collection_type("type_collection")
		.notNull()
		.default("general"),
});
