import { test } from "bun:test";
import { db } from "../../../db/db.ts";
import { tables } from "../../../tables.ts";
import { room } from "../schema.ts";

test("insert: room", async () => {
	const value = await tables.room.generateFn();
	await db.insert(room).values(value);
});
