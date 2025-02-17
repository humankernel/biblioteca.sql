import { member, researcher, professional, student } from ".";

export type MemberInsert = typeof member.$inferInsert;
export type ResearcherInsert = typeof researcher.$inferInsert;
export type ProfessionalInsert = typeof professional.$inferInsert;
export type StudentInsert = typeof student.$inferInsert;

export type MemberSelect = typeof member.$inferSelect;
export type ResearcherSelect = typeof researcher.$inferSelect;
export type ProfessionalSelect = typeof professional.$inferSelect;
export type StudentSelect = typeof student.$inferSelect;
