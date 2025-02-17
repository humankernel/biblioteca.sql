import type { Config } from "drizzle-kit";

export default {
	schema: "./src/schema/**/*",
	out: "./drizzle",
	driver: "pg",
	dbCredentials: {
		host: process.env.POSTGRES_HOST ?? "localhost",
		port: Number(process.env.POSTGRES_PORT) ?? 5432,
		user: process.env.POSTGRES_USER ?? "postgres",
		password: process.env.POSTGRES_PASSWORD ?? "1234",
		database: process.env.POSTGRES_DATABASE ?? "library_db",
	},
} satisfies Config;
