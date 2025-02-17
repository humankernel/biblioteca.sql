import {
	service,
	service_room,
	service_member,
	loan,
	loan_researcher,
	loan_professional,
	loan_library,
	fine,
} from ".";

export type ServiceInsert = typeof service.$inferInsert;
export type ServiceRoomInsert = typeof service_room.$inferInsert;
export type ServiceMemberInsert = typeof service_member.$inferInsert;
export type LoanInsert = typeof loan.$inferInsert;
export type LoanResearcherInsert = typeof loan_researcher.$inferInsert;
export type LoanProfessionalInsert = typeof loan_professional.$inferInsert;
export type LoanLibraryInsert = typeof loan_library.$inferInsert;
export type FineInsert = typeof fine.$inferInsert;

export type ServiceSelect = typeof service.$inferSelect;
export type ServiceRoomSelect = typeof service_room.$inferSelect;
export type ServiceMemberSelect = typeof service_member.$inferSelect;
export type LoanSelect = typeof loan.$inferSelect;
export type LoanResearcherSelect = typeof loan_researcher.$inferSelect;
export type LoanProfessionalSelect = typeof loan_professional.$inferSelect;
export type LoanLibrarySelect = typeof loan_library.$inferSelect;
export type FineSelect = typeof fine.$inferSelect;
