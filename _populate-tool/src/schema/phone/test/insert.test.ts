import { test } from "bun:test";
import { db } from "../../../db/db.ts";
import { tables } from "../../../tables.ts";
import { phone, phone_library, phone_room } from "../schema.ts";

test("insert: phone", async () => {
	const value = await tables.phone.generateFn();
	await db.insert(phone).values(value);
});

test("insert: phone_library", async () => {
	const value = await tables.phone_library.generateFn();
	await db.insert(phone_library).values(value);
});

test("insert: phone_room", async () => {
	const value = await tables.phone_room.generateFn();
	await db.insert(phone_room).values(value);
});
