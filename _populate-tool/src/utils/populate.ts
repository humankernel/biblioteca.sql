import { LogFn } from "../app.ts";
import { db } from "../db/db.ts";
import { type Table } from "../tables.ts";

type Populate = Table & { log?: LogFn };

export async function populate({ table, generateFn, amount, log }: Populate) {
	for (let i = 0; i < amount; i++) {
		const value = await generateFn();

		await db
			.insert(table)
			.values(value)
			.onConflictDoNothing()
			.catch((err: Error) => console.log(`table -> ${err.message}`));
	}
}
