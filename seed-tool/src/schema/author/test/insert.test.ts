import { db } from "../../../db/db";
import { tables } from "../../../tables";
import { author, author_document } from "../schema";

const testAuthor = async () => {
	const value = await tables.author.generateFn();
	// await db.delete(author).where(eq(author.id_author, value.id_author));
	await db.insert(author).values(value);
};

const testAuthorDocument = async () => {
	const value = await tables.author_document.generateFn();
	await db.insert(author_document).values(value);
};

testAuthor();
testAuthorDocument();
