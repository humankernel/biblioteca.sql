export const pickRandom = <T>(arr: T[]): T => {
	if (arr.length === 0) return [] as any;

	const idx = Math.floor(Math.random() * arr.length);
	return arr[idx];
};
