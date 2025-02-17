import { test } from "bun:test";
import { db } from "../../../db/db.ts";
import { tables } from "../../../tables.ts";
import { library } from "../schema.ts";

test("insert: library", async () => {
	const value = await tables.library.generateFn();
	await db.insert(library).values(value);
});
