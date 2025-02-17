import { pgTable, integer, varchar, serial, pgEnum } from "drizzle-orm/pg-core";

export const category_type = pgEnum("category", [
	"researcher",
	"professional",
	"student",
	"foreign",
]);

export const member = pgTable("member", {
	id_member: serial("id_member").notNull().primaryKey(),
	name: varchar("name", { length: 100 }).notNull(),
	age: integer("age"),
	country: varchar("country", { length: 100 }).notNull(),
	category: category_type("category"),
});

export const researcher = pgTable("researcher", {
	id_member: integer("id_member")
		.notNull()
		.references(() => member.id_member),
});

export const professional = pgTable("professional", {
	id_member: integer("id_member")
		.notNull()
		.references(() => member.id_member),
	organization: varchar("organization", { length: 100 }),
});

export const student = pgTable("student", {
	id_member: integer("id_member")
		.notNull()
		.references(() => member.id_member),
	school: varchar("school", { length: 100 }),
});
