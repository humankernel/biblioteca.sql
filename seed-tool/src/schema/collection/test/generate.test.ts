import { faker } from "@faker-js/faker";
import { expect, test } from "bun:test";
import { generateCollection, generateIdCollection } from "..";

test("id_collection test", async () => {
	faker.seed(0);

	const actual = await generateIdCollection(faker);

	const expected = "OPS-8615";

	expect(actual).toBe(expected);
});

test("collection test", async () => {
	faker.seed(0);

	const actual = await generateCollection(faker);

	const expected = {};

	expect(actual).toMatchObject(expected);
});
