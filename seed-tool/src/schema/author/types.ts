import { author, author_document } from "./schema";

export type AuthorInsert = typeof author.$inferInsert;
export type AuthorSelect = typeof author.$inferSelect;

export type AuthorDocumentInsert = typeof author_document.$inferInsert;
export type AuthorDocumentSelect = typeof author_document.$inferSelect;
