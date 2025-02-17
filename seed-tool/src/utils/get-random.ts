import { pickRandom } from "./pick-random";

export const getRandomId = async (getTotal, getIds) => {
	const [{ count }] = await getTotal.execute();

	const ids = await getIds.execute({
		limit: 5,
		offset: Math.floor(Math.random() * Number(count)),
	});

	const { id } = pickRandom(ids);
	return id;
};
