import { phone, phone_library, phone_room } from ".";

export type PhoneInsert = typeof phone.$inferInsert;
export type PhoneLibraryInsert = typeof phone_library.$inferInsert;
export type PhoneRoomInsert = typeof phone_room.$inferInsert;

export type PhoneSelect = typeof phone.$inferSelect;
export type PhoneLibrarySelect = typeof phone_library.$inferSelect;
export type PhoneRoomSelect = typeof phone_room.$inferSelect;
