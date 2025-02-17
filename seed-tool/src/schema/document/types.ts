import {
	book,
	document,
	document_collection,
	magazine,
	manuscript,
	map,
	media,
	music,
	paint,
	picture,
	reference,
} from "./schema";

export type DocumentInsert = typeof document.$inferInsert;
export type DocumentCollectionInsert = typeof document_collection.$inferInsert;
export type ManuscriptInsert = typeof manuscript.$inferInsert;
export type MapInsert = typeof map.$inferInsert;
export type PictureInsert = typeof picture.$inferInsert;
export type PaintInsert = typeof paint.$inferInsert;
export type MediaInsert = typeof media.$inferInsert;
export type MusicInsert = typeof music.$inferInsert;
export type ReferenceInsert = typeof reference.$inferInsert;
export type MagazineInsert = typeof magazine.$inferInsert;
export type BookInsert = typeof book.$inferInsert;

export type DocumentSelect = typeof document.$inferSelect;
export type DocumentCollectionSelect = typeof document_collection.$inferSelect;
export type ManuscriptSelect = typeof manuscript.$inferSelect;
export type MapSelect = typeof map.$inferSelect;
export type PictureSelect = typeof picture.$inferSelect;
export type PaintSelect = typeof paint.$inferSelect;
export type MediaSelect = typeof media.$inferSelect;
export type MusicSelect = typeof music.$inferSelect;
export type ReferenceSelect = typeof reference.$inferSelect;
export type MagazineSelect = typeof magazine.$inferSelect;
export type BookSelect = typeof book.$inferSelect;
