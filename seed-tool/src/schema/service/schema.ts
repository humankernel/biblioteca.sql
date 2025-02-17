import {
	pgEnum,
	pgTable,
	integer,
	serial,
	text,
	varchar,
	date,
} from "drizzle-orm/pg-core";
import { library } from "../library";
import { member, researcher, professional } from "../member";
import { room } from "../room";
import { document } from "../document";

export const service_type = pgEnum("type_service", [
	"loan",
	"heritage preservation",
	"cultural event",
	"consultation in a room",
	"bibliographic references",
]);

export const status_type = pgEnum("status", [
	"requested",
	"approved",
	"in-loan",
	"renovated",
	"returned",
	"non-returned",
	"lost",
]);
export const loan_type = pgEnum("type_loan", ["loan_member", "loan_library"]);
export const penalty_type = pgEnum("penalty", [
	"late fees",
	"suspension of borrowing privileges",
	"replacement cost",
	"processing fee",
]);

export const service = pgTable("service", {
	id_service: serial("id_service").notNull().primaryKey(),
	description_service: text("description_service"),
	type_service: service_type("type_service").notNull(),
});

export const service_room = pgTable("service_room", {
	id_service: integer("id_service")
		.notNull()
		.primaryKey()
		.references(() => service.id_service),
	id_room: varchar("id_room", { length: 20 })
		.notNull()
		.primaryKey()
		.references(() => room.id_room),
});

export const service_member = pgTable("service_member", {
	id_service: integer("id_service")
		.notNull()
		.primaryKey()
		.references(() => service.id_service),
	id_member: integer("id_member")
		.notNull()
		.primaryKey()
		.references(() => member.id_member),
});

export const loan = pgTable("loan", {
	id_service: integer("id_service")
		.notNull()
		.primaryKey()
		.references(() => service.id_service),
	id_document: integer("id_document")
		.notNull()
		.primaryKey()
		.references(() => document.id_document),
	term: integer("term"),
	start_date: date("start_date").notNull(),
	end_date: date("end_date").notNull(),
	status: status_type("status").notNull(),
	type_loan: loan_type("type_loan").notNull(),
});

export const loan_researcher = pgTable("loan_researcher", {
	id_service: integer("id_service")
		.notNull()
		.primaryKey()
		.references(() => service.id_service),
	id_document: integer("id_document")
		.notNull()
		.primaryKey()
		.references(() => document.id_document),
	id_member: integer("id_member")
		.notNull()
		.primaryKey()
		.references(() => researcher.id_member),
});

export const loan_professional = pgTable("loan_professional", {
	id_service: integer("id_service")
		.notNull()
		.primaryKey()
		.references(() => service.id_service),
	id_document: integer("id_document")
		.notNull()
		.primaryKey()
		.references(() => document.id_document),
	id_member: integer("id_member")
		.notNull()
		.primaryKey()
		.references(() => professional.id_member),
});

export const loan_library = pgTable("loan_library", {
	id_service: integer("id_service")
		.notNull()
		.primaryKey()
		.references(() => service.id_service),
	id_document: integer("id_document")
		.notNull()
		.primaryKey()
		.references(() => document.id_document),
	id_library: integer("id_library")
		.notNull()
		.primaryKey()
		.references(() => library.id_library),
	id_library2: integer("id_library2")
		.notNull()
		.primaryKey()
		.references(() => library.id_library),
});

export const fine = pgTable("fine", {
	id_fine: serial("id_fine").notNull().primaryKey(),
	id_service: integer("id_service")
		.notNull()
		.primaryKey()
		.references(() => service.id_service),
	id_document: integer("id_document")
		.notNull()
		.primaryKey()
		.references(() => document.id_document),
	penalty: penalty_type("penalty").notNull(),
	fee: integer("fee"),
});
