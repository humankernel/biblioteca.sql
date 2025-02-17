import { test } from "bun:test";
import { db } from "../../../db/db.ts";
import { email, email_collection, email_library, email_room } from "../schema";
import { tables } from "../../../tables.ts";

test("insert: email", async () => {
	const value = await tables.email.generateFn();
	await db.insert(email).values(value);
});

test("insert: email_library", async () => {
	const value = await tables.email_library.generateFn();
	await db.insert(email_library).values(value);
});

test("insert: email_room", async () => {
	const value = await tables.email_room.generateFn();
	await db.insert(email_room).values(value);
});

test("insert: email_collection", async () => {
	const value = await tables.email_collection.generateFn();
	await db.insert(email_collection).values(value);
});
