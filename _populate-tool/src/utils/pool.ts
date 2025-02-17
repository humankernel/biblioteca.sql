export type Id = string | number | {};
type Pool = Record<string, Id[]>;

export class KeysPool {
	pool: Pool = {};

	tableExists(tableName: string): boolean {
		return tableName in this.pool;
	}
	getKeys(tableName: string): Id[] {
		if (!this.tableExists(tableName)) return [];
		return this.pool[tableName];
	}
	getRandomKey(tableName: string): Id | undefined {
		if (this.tableExists(tableName)) {
			const keys = this.pool[tableName];
			const randIdx = Math.floor(Math.random() * keys.length);
			return keys[randIdx];
		}
	}
	addKey(tableName: string, id: Id): void {
		if (!this.tableExists(tableName)) this.pool[tableName] = [];
		this.pool[tableName].push(id);
	}
}
