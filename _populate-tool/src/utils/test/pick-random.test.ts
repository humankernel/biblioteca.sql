import { expect, test } from "bun:test";
import { pickRandom } from "../pick-random";

test("pickRandom: [] => []", () => {
	expect(pickRandom([])).toBeArray();
});

test("pickRandom: ['1'] => '1'", () => {
	expect(pickRandom([{ name: "strangedevel" }])).toMatchObject({
		name: "strangedevel",
	});
});
