import { test } from "bun:test";
import { db } from "../../../db/db.ts";
import { tables } from "../../../tables.ts";
import {
	fine,
	loan,
	loan_library,
	loan_professional,
	loan_researcher,
	service,
	service_member,
	service_room,
} from "../schema.ts";

test("insert: service", async () => {
	const value = await tables.service.generateFn();
	await db.insert(service).values(value);
});

test("insert: service_room", async () => {
	const value = await tables.service_room.generateFn();
	await db.insert(service_room).values(value);
});

test("insert: service_member", async () => {
	const value = await tables.service_member.generateFn();
	await db.insert(service_member).values(value);
});

test("insert: loan", async () => {
	const value = await tables.loan.generateFn();
	await db.insert(loan).values(value);
});

test("insert: loan_researcher", async () => {
	const value = await tables.loan_researcher.generateFn();
	await db.insert(loan_researcher).values(value);
});

test("insert: loan_professional", async () => {
	const value = await tables.loan_professional.generateFn();
	await db.insert(loan_professional).values(value);
});

test("insert: loan_library", async () => {
	const value = await tables.loan_library.generateFn();
	await db.insert(loan_library).values(value);
});

test("insert: fine", async () => {
	const value = await tables.fine.generateFn();
	await db.insert(fine).values(value);
});
