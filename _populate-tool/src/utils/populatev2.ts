import { LogFn } from "../app";
import { db } from "../db/db";
import { Table, tables } from "../tables";
import { cacheKeys } from "./cache";
import { matchSpecializations } from "./match-specialization";
import { KeysPool } from "./pool";

type Populate = Table & { log?: LogFn; tableName: string, pool: KeysPool };
export async function populate({
	tableName,
	table,
	generateFn,
	amount,
	log,
	pool,
}: Populate) {
	for (let i = 0; i < amount; i++) {
		const value: any = await generateFn();

		const inserted = await db
			.insert(table)
			.values(value)
			.returning()
			.onConflictDoNothing()
			.catch((err: Error) =>
				console.log(`${tableName} -> ${err.message}`)
			);

		// cacheKeys(pool, tableName, inserted[0])
		// console.log(tableName);
		
		await matchSpecializations(tableName, inserted[0]);
	}
}
