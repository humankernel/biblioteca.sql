import { Id, KeysPool } from "./pool";

interface HasKey {
	[key: string]: Id;
}

type SaveKeys<T extends HasKey> = {
	generateFn: () => Promise<T>;
	keyName: string;
	pool: KeysPool;
};

export async function saveKeys<T extends HasKey>({
	generateFn,
	keyName,
	pool,
}: SaveKeys<T>): Promise<T> {
	const value = await generateFn();

	if (keyName in value) {
		pool.addKey(keyName, value[keyName]);
	}

	return value;
}
