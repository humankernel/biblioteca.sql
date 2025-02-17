import { Faker } from "@faker-js/faker";
import {
	ServiceInsert,
	service_type,
	ServiceRoomInsert,
	ServiceMemberInsert,
	LoanInsert,
	status_type,
	loan_type,
	LoanResearcherInsert,
	LoanLibraryInsert,
	FineInsert,
	penalty_type,
	ServiceSelect,
} from ".";
import { pickRandom } from "../../utils/pick-random";
import { RoomSelect } from "../room";
import { MemberSelect } from "../member";
import { DocumentSelect } from "../document";
import { LibrarySelect } from "../library";

export const generateService = async (
	faker: Faker
): Promise<ServiceInsert> => ({
	description_service: faker.lorem.paragraph(),
	type_service: pickRandom(service_type.enumValues),
});

type GenerateServiceRoom = {
	id_service: ServiceSelect["id_service"];
	id_room: RoomSelect["id_room"];
};

export const generateServiceRoom = async ({
	id_service,
	id_room,
}: GenerateServiceRoom): Promise<ServiceRoomInsert> => ({
	id_service,
	id_room,
});

type GenerateServiceMember = {
	id_service: ServiceSelect["id_service"];
	id_member: MemberSelect["id_member"];
};

export const generateServiceMember = async ({
	id_member,
	id_service,
}: GenerateServiceMember): Promise<ServiceMemberInsert> => ({
	id_member,
	id_service,
});

type GenerateLoan = {
	faker: Faker;
	id_service: ServiceSelect["id_service"];
	id_document: DocumentSelect["id_document"];
};

export const generateLoan = async ({
	faker,
	id_service,
	id_document,
}: GenerateLoan): Promise<LoanInsert> => ({
	id_service,
	id_document,
	term: faker.number.int(30),
	start_date: faker.date.past().toString(),
	end_date: faker.date.future().toString(),
	status: pickRandom(status_type.enumValues),
	type_loan: pickRandom(loan_type.enumValues),
});

type GenerateLoanMember = {
	id_service: ServiceSelect["id_service"];
	id_document: DocumentSelect["id_document"];
	id_member: MemberSelect["id_member"];
};

export const generateLoanMember = async ({
	id_service,
	id_document,
	id_member,
}: GenerateLoanMember): Promise<LoanResearcherInsert> => ({
	id_service,
	id_document,
	id_member,
});

type GenerateLoanLibrary = {
	id_service: ServiceSelect["id_service"];
	id_document: DocumentSelect["id_document"];
	id_library: LibrarySelect["id_library"];
	id_library2: LibrarySelect["id_library"];
};

export const generateLoanLibrary = async ({
	id_service,
	id_document,
	id_library,
	id_library2,
}: GenerateLoanLibrary): Promise<LoanLibraryInsert> => ({
	id_service,
	id_document,
	id_library,
	id_library2,
});

type GenerateFine = {
	faker: Faker;
	id_service: ServiceSelect["id_service"];
	id_document: DocumentSelect["id_document"];
};

export const generateFine = async ({
	faker,
	id_service,
	id_document,
}: GenerateFine): Promise<FineInsert> => ({
	id_service,
	id_document,
	penalty: pickRandom(penalty_type.enumValues),
	fee: faker.number.float({ max: 1000, precision: 3 }),
});
