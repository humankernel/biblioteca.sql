import { pgEnum, pgTable, integer, varchar, text } from "drizzle-orm/pg-core";
import { library } from "../library/index.ts";

export const access_method_type = pgEnum("access_method", [
	"member card",
	"provisional pass",
]);

export const room = pgTable("room", {
	id_room: varchar("id_room", { length: 20 }).primaryKey(), //CAR 2018-0070-C
	id_library: integer("id_library").references(() => library.id_library),
	name_room: varchar("name_room", { length: 255 }).unique().notNull(),
	location_room: varchar("location_room", { length: 255 }).notNull(),
	description_room: text("description_room"),
	access_method: access_method_type("access_method"),
	phone_extension: integer("phone_extension"),
});
