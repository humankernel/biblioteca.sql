import { db } from "../../../db/db";
import { tables } from "../../../tables";
import { document } from "../../document";

const testCollection = async () => {
	const value = await tables.collection.generateFn();
	// await db.delete(author).where(eq(author.id_author, value.id_author));
	await db.insert(document).values(value);
};

testCollection();
