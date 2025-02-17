import { pgTable, integer, serial, varchar, text } from "drizzle-orm/pg-core";
import { document } from "../document";

export const author = pgTable("author", {
	id_author: serial("id_author").notNull().primaryKey(),
	name_author: varchar("name_author", { length: 100 }).notNull(),
	country_author: varchar("country_author", { length: 100 }).notNull(),
	description_author: text("description_author"),
});

export const author_document = pgTable("author_document", {
	id_author: integer("id_author")
		.notNull()
		.primaryKey()
		.references(() => author.id_author),
	id_document: integer("id_document")
		.notNull()
		.primaryKey()
		.references(() => document.id_document),
});
