import {
	pgTable,
	integer,
	text,
	varchar,
	date,
	boolean,
	serial,
	pgEnum,
} from "drizzle-orm/pg-core";
import { collection } from "../collection/schema.ts";

export const format_type = pgEnum("format", ["physical", "digital"]);
export const document_type = pgEnum("type_document", [
	"art",
	"manuscript",
	"ethnology",
	"file",
	"map",
	"picture",
	"paint",
	"media",
	"music",
	"reference",
	"magazine",
	"book",
]);

export const map_type = pgEnum("type_map", [
	"topographic",
	"road",
	"thematic",
	"geologic",
	"political",
	"physical",
]);

export const technique_type = pgEnum("technique", [
	"oil",
	"acrylic",
	"watercolor",
	"pastel",
	"encaustic",
	"fresco",
	"gouache",
	"ink wash",
	"spray",
]);

export const document = pgTable("document", {
	id_document: serial("id_document").notNull().primaryKey(),
	title: varchar("title", { length: 255 }).notNull(),
	created_at: date("created_at"),
	editorial: varchar("editorial", { length: 255 }),
	publication_place: varchar("publication_place", { length: 255 }),
	language: varchar("language", { length: 50 }),
	format: format_type("format"),
	subject: varchar("subject", { length: 255 }),
	summary: text("summary"),
	is_patrimony: boolean("is_patrimony"),
	note: text("note"),
	type_document: document_type("type_document"),
});

export const document_collection = pgTable("document_collection", {
	id_document: integer("id_document")
		.notNull()
		.primaryKey()
		.references(() => document.id_document),
	id_collection: varchar("id_collection", { length: 10 })
		.notNull()
		.primaryKey()
		.references(() => collection.id_collection),
});

export const manuscript = pgTable("manuscript", {
	id_document: integer("id_document")
		.notNull()
		.primaryKey()
		.references(() => document.id_document),
	period: varchar("period", { length: 100 }),
});

export const map = pgTable("map", {
	id_document: integer("id_document")
		.notNull()
		.primaryKey()
		.references(() => document.id_document),
	dimension_height: integer("dimension_height").notNull(),
	dimension_width: integer("dimension_width").notNull(),
	scale: varchar("scale", { length: 20 }),
	type_map: map_type("type_map").notNull(),
});

export const picture = pgTable("picture", {
	id_document: integer("id_document")
		.notNull()
		.primaryKey()
		.references(() => document.id_document),
	dimension_height: integer("dimension_height").notNull(),
	dimension_width: integer("dimension_width").notNull(),
});

export const paint = pgTable("paint", {
	id_document: integer("id_document")
		.notNull()
		.primaryKey()
		.references(() => document.id_document),
	technique: technique_type("technique").notNull(),
	dimension_height: integer("dimension_height").notNull(),
	dimension_width: integer("dimension_width").notNull(),
});

export const media = pgTable("media", {
	id_document: integer("id_document")
		.notNull()
		.primaryKey()
		.references(() => document.id_document),
	genre: varchar("genre", { length: 100 }),
	director: varchar("director", { length: 100 }),
	producer: varchar("producer", { length: 100 }),
	duration: integer("duration"),
});

export const music = pgTable("music", {
	id_document: integer("id_document")
		.notNull()
		.primaryKey()
		.references(() => document.id_document),
	genre: varchar("genre", { length: 100 }),
	performer: varchar("performer", { length: 100 }),
	composer: varchar("composer", { length: 100 }),
	duration: integer("duration"),
});

export const reference = pgTable("reference", {
	id_document: integer("id_document")
		.notNull()
		.primaryKey()
		.references(() => document.id_document),
	serial: integer("serial"),
});

export const magazine = pgTable("magazine", {
	id_document: integer("id_document")
		.notNull()
		.primaryKey()
		.references(() => document.id_document),
	editor: varchar("editor", { length: 100 }),
	issn: varchar("issn", { length: 20 }),
});

export const book = pgTable("book", {
	id_document: integer("id_document")
		.notNull()
		.primaryKey()
		.references(() => document.id_document),
	genre: varchar("genre", { length: 50 }),
	issn: varchar("issn", { length: 20 }),
	isbn: varchar("isbn", { length: 20 }),
	dewey: integer("dewey"),
});
