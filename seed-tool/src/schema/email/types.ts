import { email, email_library, email_room, email_collection } from ".";

export type EmailInsert = typeof email.$inferInsert;
export type EmailLibraryInsert = typeof email_library.$inferInsert;
export type EmailRoomInsert = typeof email_room.$inferInsert;
export type EmailCollectionInsert = typeof email_collection.$inferInsert;

export type EmailSelect = typeof email.$inferSelect;
export type EmailLibrarySelect = typeof email_library.$inferSelect;
export type EmailRoomSelect = typeof email_room.$inferSelect;
export type EmailCollectionSelect = typeof email_collection.$inferSelect;
