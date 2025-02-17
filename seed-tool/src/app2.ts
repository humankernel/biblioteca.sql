import { Logger, ILogObj } from "tslog";
import { Table, tables } from "./tables.ts";
import { populate } from "./utils/populatev2.ts";
import { db } from "./db/db.ts";
import { library } from "./schema/library/schema.ts";

export type LogFn = Logger<ILogObj>;
const log: LogFn = new Logger();

const totalStartTime = performance.now();

const order = [
	"service",
	"member",
	"service_member",
	"author",
	"document",
	"author_document",
	"loan",
	"fine",
	"loan_professional",
	"loan_researcher",
	"email",
	"phone",
	"library",
	"email_library",
	"phone_library",
	"loan_library",
	"room",
	"collection",
	"email_collection",
	"document_collection",
	"email_room",
	"phone_room",
	"service_room",
];

// await db
// 	.insert(library)
// 	.values({
// 		id_library: 1,
// 		name_library: "Biblioteca Nacional Jose Marti",
// 		location_library: "habana",
// 		description_library: "Biblioteca Nacional Jose Marti",
// 		website: "http://www.bnjm.cu/",
// 	})
// 	.onConflictDoNothing();

for (const tableName of order) {
	const { table, generateFn, amount } = tables[tableName] as any as Table;

	const startTime = performance.now();
	await populate({ tableName, table, generateFn, amount, log });
	const timeTook = performance.now() - startTime;
	log.info(`${tableName}: ⏱️ ${timeTook.toFixed(4)}ms`);
}

const timeTook = performance.now() - totalStartTime;
log.info(`The total time was: ⏰${timeTook.toFixed(4)}ms`);
