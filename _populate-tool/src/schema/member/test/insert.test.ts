import { test } from "bun:test";
import { db } from "../../../db/db.ts";
import { tables } from "../../../tables.ts";
import { member, professional, researcher, student } from "../schema.ts";

test("insert: member", async () => {
	const value = await tables.member.generateFn();
	await db.insert(member).values(value);
});

test("insert: researcher", async () => {
	const value = await tables.researcher.generateFn();
	await db.insert(researcher).values(value);
});

test("insert: professional", async () => {
	const value = await tables.professional.generateFn();
	await db.insert(professional).values(value);
});

test("insert: student", async () => {
	const value = await tables.student.generateFn();
	await db.insert(student).values(value);
});
