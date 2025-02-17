import { expect, test } from "bun:test";
import { KeysPool } from "../pool";

test("insert + get: pool", () => {
	const pool = new KeysPool();

	pool.addKey("library", 1);

	expect(pool.getKeys("library")).toBeArray();
	expect(pool.getKeys("library")[0]).toBe(1);

	pool.addKey("library", 2);
	expect(pool.getKeys("library")[1]).toBe(2);
});

test("getRandom: pool - empty", () => {
	const pool = new KeysPool();

	expect(pool.getRandomKey("library")).toBeUndefined();
	pool.addKey("library", 1);
	expect(pool.getRandomKey("library")).toBe(1);
});

test("getRandom: pool", () => {
	const pool = new KeysPool();

	pool.addKey("library", 1);
	pool.addKey("library", 2);
	pool.addKey("library", 3);
	pool.addKey("library", 4);
	pool.addKey("library", 5);

	expect(pool.getRandomKey("library")).toBeDefined();
});

test("get all keys: pool", () => {
	const pool = new KeysPool();

	expect(pool.getKeys("library")).toBeArray();
	pool.addKey("library", 1);
	expect(pool.getKeys("library")).toBeArray();
	pool.addKey("library", 2);
	expect(pool.getKeys("library")[0]).toBe(1);
	expect(pool.getKeys("library")[1]).toBe(2);
});
