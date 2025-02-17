import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";

const DEFAULT_CONFIG = {
	host: process.env.POSTGRES_HOST ?? "localhost",
	port: Number(process.env.POSTGRES_PORT) ?? 5432,
	user: process.env.POSTGRES_USER ?? "postgres",
	password: process.env.POSTGRES_PASSWORD ?? "1234",
	db: process.env.POSTGRES_DATABASE ?? "postgres",
};

const queryClient = postgres(DEFAULT_CONFIG);
export const db = drizzle(queryClient);
