class Graph<T> {
	private adjList: Map<number, number[]>;

	constructor(nodes: T[]) {
		this.adjList = new Map<number, number[]>();
	}

	addEdge(v: number, w: number): void {
		if (!this.adjList.has(v)) {
			this.adjList.set(v, []);
		}
		this.adjList.get(v)!.push(w);
	}

	topologicalSortUtil(v: number, visited: boolean[], stack: number[]): void {
		visited[v] = true;
		const neighbours = this.adjList.get(v);
		if (neighbours) {
			for (const neighbour of neighbours) {
				if (!visited[neighbour]) {
					this.topologicalSortUtil(neighbour, visited, stack);
				}
			}
		}
		stack.unshift(v);
	}

	topologicalSort(): number[] {
		const stack: number[] = [];
		const visited: boolean[] = [];
		for (let i = 0; i <= Array.from(this.adjList.keys()).length; i++) {
			visited[i] = false;
		}
		for (const node of Array.from(this.adjList.keys())) {
			if (!visited[node]) {
				this.topologicalSortUtil(node, visited, stack);
			}
		}
		return stack;
	}
}

const tables = [
	"library",
	"room",
	"collection",
	"document",
	"document_collection",
	"manuscript",
	"map",
	"picture",
	"paint",
	"media",
	"music",
	"reference",
	"magazine",
	"book",
	"author",
	"author_document",
	"member",
	"student",
	"researcher",
	"professional",
	"phone",
	"phone_library",
	"phone_room",
	"email",
	"email_library",
	"email_room",
	"email_collection",
	"service",
	"service_room",
	"service_member",
	"loan",
	"loan_library",
	"loan_researcher",
	"loan_professional",
	"fine",
];

const g = new Graph(tables);

g.addEdge(tables.indexOf("library"), tables.indexOf("room"));
g.addEdge(tables.indexOf("library"), tables.indexOf("loan_library"));
g.addEdge(tables.indexOf("library"), tables.indexOf("phone_library"));
g.addEdge(tables.indexOf("library"), tables.indexOf("email_library"));

g.addEdge(tables.indexOf("room"), tables.indexOf("service_room"));
g.addEdge(tables.indexOf("room"), tables.indexOf("phone_room"));
g.addEdge(tables.indexOf("room"), tables.indexOf("email_room"));
g.addEdge(tables.indexOf("room"), tables.indexOf("collection"));

g.addEdge(tables.indexOf("collection"), tables.indexOf("document_collection"));
g.addEdge(tables.indexOf("collection"), tables.indexOf("email_collection"));

g.addEdge(tables.indexOf("phone"), tables.indexOf("phone_library"));
g.addEdge(tables.indexOf("phone"), tables.indexOf("phone_room"));

g.addEdge(tables.indexOf("email"), tables.indexOf("email_library"));
g.addEdge(tables.indexOf("email"), tables.indexOf("email_room"));
g.addEdge(tables.indexOf("email"), tables.indexOf("email_collection"));

g.addEdge(tables.indexOf("document"), tables.indexOf("manuscript"));
g.addEdge(tables.indexOf("document"), tables.indexOf("map"));
g.addEdge(tables.indexOf("document"), tables.indexOf("picture"));
g.addEdge(tables.indexOf("document"), tables.indexOf("paint"));
g.addEdge(tables.indexOf("document"), tables.indexOf("media"));
g.addEdge(tables.indexOf("document"), tables.indexOf("music"));
g.addEdge(tables.indexOf("document"), tables.indexOf("reference"));
g.addEdge(tables.indexOf("document"), tables.indexOf("magazine"));
g.addEdge(tables.indexOf("document"), tables.indexOf("book"));
g.addEdge(tables.indexOf("document"), tables.indexOf("loan"));

g.addEdge(tables.indexOf("author"), tables.indexOf("author_document"));
g.addEdge(tables.indexOf("document"), tables.indexOf("author_document"));

g.addEdge(tables.indexOf("member"), tables.indexOf("student"));
g.addEdge(tables.indexOf("member"), tables.indexOf("researcher"));
g.addEdge(tables.indexOf("member"), tables.indexOf("professional"));
g.addEdge(tables.indexOf("member"), tables.indexOf("service_member"));

g.addEdge(tables.indexOf("service"), tables.indexOf("service_room"));
g.addEdge(tables.indexOf("service"), tables.indexOf("loan"));
g.addEdge(tables.indexOf("service"), tables.indexOf("service_member"));

g.addEdge(tables.indexOf("loan"), tables.indexOf("loan_library"));
g.addEdge(tables.indexOf("loan"), tables.indexOf("loan_researcher"));
g.addEdge(tables.indexOf("loan"), tables.indexOf("loan_professional"));
g.addEdge(tables.indexOf("loan"), tables.indexOf("fine"));

export const getOrderOfTables = (): string[] => {
	return g.topologicalSort().map((i) => tables[i]);
};
