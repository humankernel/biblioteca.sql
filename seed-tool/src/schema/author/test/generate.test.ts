import { faker } from "@faker-js/faker";
import { expect, test } from "bun:test";
import { generateAuthor, generateAuthorDocument } from "..";

test("author test", async () => {
	faker.seed(0);

	const actual = await generateAuthor(faker);
	const expected = {
		name_author: "Terrence Sporer",
		country_author: "Svalbard & Jan Mayen Islands",
		description_author:
			"Uberrime curriculum qui sint credo debitis coadunatio. Adstringo vix certe credo demulceo textilis tonsor eveniet denego minus. Vespillo tubineus aeneus confero alias socius.",
	};

	expect(actual).toMatchObject(expected);
});

test("author_document test", async () => {
	faker.seed(0);

	const actual = await generateAuthorDocument(faker);

	// console.log(actual);

	const expected = {
		id_author: "368987",
		id_document: 629035,
		country_author: "Cuba",
		description_author:
			"Uberrime curriculum qui sint credo debitis coadunatio. Adstringo vix certe credo demulceo textilis tonsor eveniet denego minus. Vespillo tubineus aeneus confero alias socius.",
		name_author: "Terrence Sporer",
	};

	// expect(actual).toMatchObject(expected);
});
