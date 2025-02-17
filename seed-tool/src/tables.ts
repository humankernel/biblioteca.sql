import { faker } from "@faker-js/faker";
import { library } from "./schema/library/schema.ts";

import {
	author,
	author_document,
	generateAuthor,
	generateAuthorDocument,
} from "./schema/author/index.ts";
import { collection, generateCollection } from "./schema/collection/index.ts";
import {
	email,
	email_collection,
	email_library,
	email_room,
	generateEmail,
	generateEmailLibrary,
	generateEmailRoom,
} from "./schema/email/index.ts";
import {
	document_collection,
	manuscript,
	map,
	picture,
	paint,
	media,
	music,
	reference,
	magazine,
	book,
	generateDocument,
	generateDocumentCollection,
	generateManuscript,
	generateMap,
	generatePicture,
	generatePaint,
	generateMedia,
	generateMusic,
	generateReference,
	generateMagazine,
	generateBook,
	document,
} from "./schema/document/index.ts";
import { generateLibrary } from "./schema/library/index.ts";
import {
	member,
	researcher,
	professional,
	student,
	generateMember,
	generateResearcher,
	generateProfessional,
	generateStudent,
} from "./schema/member/index.ts";
import {
	phone,
	phone_library,
	phone_room,
	generatePhone,
	generatePhoneLibrary,
	generatePhoneRoom,
} from "./schema/phone/index.ts";
import {
	service,
	service_room,
	service_member,
	loan,
	loan_researcher,
	loan_professional,
	loan_library,
	fine,
	generateService,
	generateServiceRoom,
	generateServiceMember,
	generateLoan,
	generateLoanMember,
	generateLoanLibrary,
	generateFine,
} from "./schema/service/index.ts";
import { room, generateRoom } from "./schema/room/index.ts";
import { generateEmailCollection } from "./schema/email/generate.ts";
import { getRandomId } from "./utils/get-random.ts";
import {
	getEmails,
	getIdsAuthor,
	getIdsCollection,
	getIdsDocument,
	getIdsLibrary,
	getIdsLoan,
	getIdsMember,
	getIdsProfessional,
	getIdsResearcher,
	getIdsRoom,
	getIdsService,
	getPhoneNumbers,
	getTotalAuthors,
	getTotalCollections,
	getTotalDocuments,
	getTotalEmails,
	getTotalLibrary,
	getTotalLoan,
	getTotalMember,
	getTotalPhone,
	getTotalProfessional,
	getTotalResearcher,
	getTotalRoom,
	getTotalServices,
} from "./utils/get-ids.ts";
import { PgTable } from "drizzle-orm/pg-core";

export type Table<T extends PgTable = PgTable> = {
	tableName: string;
	table: T;
	generateFn: () => Promise<T["$inferInsert"]>;
	amount: number;
};

const TOTAL_AMOUNT = 170000;

export type Tables = Record<string, Table>;
export const tables = {
	library: {
		tableName: "library",
		table: library,
		generateFn: () => generateLibrary(faker),
		amount: TOTAL_AMOUNT,
	},
	room: {
		tableName: "room",
		table: room,
		generateFn: async () =>
			generateRoom({
				faker,
				id_library: await getRandomId(getTotalLibrary, getIdsLibrary),
			}),
		amount: TOTAL_AMOUNT,
	},
	collection: {
		tableName: "collection",
		table: collection,
		generateFn: async () =>
			generateCollection({
				faker,
				id_room: await getRandomId(getTotalRoom, getIdsRoom),
			}),
		amount: TOTAL_AMOUNT,
	},
	document: {
		tableName: "document",
		table: document,
		generateFn: () => generateDocument(faker),
		amount: TOTAL_AMOUNT,
	},

	manuscript: {
		tableName: "manuscript",
		table: manuscript,
		generateFn: async () =>
			generateManuscript({
				faker,
				id_document: await getRandomId(
					getTotalDocuments,
					getIdsDocument
				),
			}),
		amount: TOTAL_AMOUNT / 10,
	},
	map: {
		tableName: "map",
		table: map,
		generateFn: async () =>
			generateMap({
				faker,
				id_document: await getRandomId(
					getTotalDocuments,
					getIdsDocument
				),
			}),
		amount: TOTAL_AMOUNT / 10,
	},
	picture: {
		tableName: "picture",
		table: picture,
		generateFn: async () =>
			generatePicture({
				faker,
				id_document: await getRandomId(
					getTotalDocuments,
					getIdsDocument
				),
			}),
		amount: TOTAL_AMOUNT / 10,
	},
	paint: {
		tableName: "paint",
		table: paint,
		generateFn: async () =>
			generatePaint({
				faker,
				id_document: await getRandomId(
					getTotalDocuments,
					getIdsDocument
				),
			}),
		amount: TOTAL_AMOUNT / 10,
	},
	media: {
		tableName: "media",
		table: media,
		generateFn: async () =>
			generateMedia({
				faker,
				id_document: await getRandomId(
					getTotalDocuments,
					getIdsDocument
				),
			}),
		amount: TOTAL_AMOUNT / 10,
	},
	music: {
		tableName: "music",
		table: music,
		generateFn: async () =>
			generateMusic({
				faker,
				id_document: await getRandomId(
					getTotalDocuments,
					getIdsDocument
				),
			}),
		amount: TOTAL_AMOUNT / 10,
	},
	reference: {
		tableName: "reference",
		table: reference,
		generateFn: async () =>
			generateReference({
				faker,
				id_document: await getRandomId(
					getTotalDocuments,
					getIdsDocument
				),
			}),
		amount: TOTAL_AMOUNT / 10,
	},
	magazine: {
		tableName: "magazine",
		table: magazine,
		generateFn: async () =>
			generateMagazine({
				faker,
				id_document: await getRandomId(
					getTotalDocuments,
					getIdsDocument
				),
			}),
		amount: TOTAL_AMOUNT / 10,
	},
	book: {
		tableName: "book",
		table: book,
		generateFn: async () =>
			generateBook({
				faker,
				id_document: await getRandomId(
					getTotalDocuments,
					getIdsDocument
				),
			}),
		amount: TOTAL_AMOUNT / 10,
	},
	document_collection: {
		tableName: "document_collection",
		table: document_collection,
		generateFn: async () =>
			generateDocumentCollection({
				id_document: await getRandomId(
					getTotalDocuments,
					getIdsDocument
				),
				id_collection: await getRandomId(
					getTotalCollections,
					getIdsCollection
				),
			}),
		amount: TOTAL_AMOUNT / 10,
	},

	author: {
		tableName: "author",
		table: author,
		generateFn: () => generateAuthor(faker),
		amount: TOTAL_AMOUNT,
	},
	author_document: {
		tableName: "author_document",
		table: author_document,
		generateFn: async () =>
			generateAuthorDocument({
				id_author: await getRandomId(getTotalAuthors, getIdsAuthor),
				id_document: await getRandomId(
					getTotalDocuments,
					getIdsDocument
				),
			}),
		amount: TOTAL_AMOUNT,
	},
	email: {
		tableName: "email",
		table: email,
		generateFn: () => generateEmail(faker),
		amount: TOTAL_AMOUNT,
	},
	email_library: {
		tableName: "email_library",
		table: email_library,
		generateFn: async () =>
			generateEmailLibrary({
				email: await getRandomId(getTotalEmails, getEmails),
				id_library: await getRandomId(getTotalLibrary, getIdsLibrary),
			}),
		amount: TOTAL_AMOUNT / 3,
	},
	email_room: {
		tableName: "email_room",
		table: email_room,
		generateFn: async () =>
			generateEmailRoom({
				email: await getRandomId(getTotalEmails, getEmails),
				id_room: await getRandomId(getTotalRoom, getIdsRoom),
			}),
		amount: TOTAL_AMOUNT / 3,
	},
	email_collection: {
		tableName: "email_collection",
		table: email_collection,
		generateFn: async () =>
			generateEmailCollection({
				email: await getRandomId(getTotalEmails, getEmails),
				id_collection: await getRandomId(
					getTotalCollections,
					getIdsCollection
				),
			}),
		amount: TOTAL_AMOUNT / 3,
	},
	member: {
		tableName: "member",
		table: member,
		generateFn: () => generateMember(faker),
		amount: TOTAL_AMOUNT,
	},
	researcher: {
		tableName: "researcher",
		table: researcher,
		generateFn: async () =>
			generateResearcher({
				id_member: await getRandomId(getTotalMember, getIdsMember),
			}),
		amount: TOTAL_AMOUNT,
	},
	professional: {
		tableName: "professional",
		table: professional,
		generateFn: async () =>
			generateProfessional({
				faker,
				id_member: await getRandomId(getTotalMember, getIdsMember),
			}),
		amount: TOTAL_AMOUNT,
	},
	student: {
		tableName: "student",
		table: student,
		generateFn: async () =>
			generateStudent({
				faker,
				id_member: await getRandomId(getTotalMember, getIdsMember),
			}),
		amount: TOTAL_AMOUNT,
	},
	phone: {
		tableName: "phone",
		table: phone,
		generateFn: () => generatePhone(faker),
		amount: TOTAL_AMOUNT,
	},
	phone_library: {
		tableName: "phone_library",
		table: phone_library,
		generateFn: async () =>
			generatePhoneLibrary({
				id_library: await getRandomId(getTotalLibrary, getIdsLibrary),
				phone_number: await getRandomId(getTotalPhone, getPhoneNumbers),
			}),
		amount: TOTAL_AMOUNT,
	},
	phone_room: {
		tableName: "phone_room",
		table: phone_room,
		generateFn: async () =>
			generatePhoneRoom({
				phone_number: await getRandomId(getTotalPhone, getPhoneNumbers),
				id_room: await getRandomId(getTotalRoom, getIdsRoom),
			}),
		amount: TOTAL_AMOUNT,
	},
	service: {
		tableName: "service",
		table: service,
		generateFn: () => generateService(faker),
		amount: TOTAL_AMOUNT,
	},
	service_room: {
		tableName: "service_room",
		table: service_room,
		generateFn: async () =>
			generateServiceRoom({
				id_service: await getRandomId(getTotalServices, getIdsService),
				id_room: await getRandomId(getTotalRoom, getIdsRoom),
			}),
		amount: TOTAL_AMOUNT,
	},
	service_member: {
		tableName: "service_member",
		table: service_member,
		generateFn: async () =>
			generateServiceMember({
				id_service: await getRandomId(getTotalServices, getIdsService),
				id_member: await getRandomId(getTotalMember, getIdsMember),
			}),
		amount: TOTAL_AMOUNT,
	},
	loan: {
		tableName: "loan",
		table: loan,
		generateFn: async () =>
			generateLoan({
				faker,
				id_service: await getRandomId(getTotalServices, getIdsService),
				id_document: await getRandomId(
					getTotalDocuments,
					getIdsDocument
				),
			}),
		amount: TOTAL_AMOUNT,
	},
	loan_researcher: {
		tableName: "loan_researcher",
		table: loan_researcher,
		generateFn: async () => {
			const { id_service, id_document } = await getRandomId(
				getTotalLoan,
				getIdsLoan
			);
			return generateLoanMember({
				id_service,
				id_document,
				id_member: await getRandomId(getTotalResearcher, getIdsResearcher),
			});
		},
		amount: TOTAL_AMOUNT,
	},
	loan_professional: {
		tableName: "loan_professional",
		table: loan_professional,
		generateFn: async () => {
			const { id_service, id_document } = await getRandomId(
				getTotalLoan,
				getIdsLoan
			);
			return generateLoanMember({
				id_service,
				id_document,
				id_member: await getRandomId(getTotalProfessional, getIdsProfessional),
			});
		},
		amount: TOTAL_AMOUNT,
	},
	loan_library: {
		tableName: "loan_library",
		table: loan_library,
		generateFn: async () => {
			const { id_service, id_document } = await getRandomId(
				getTotalLoan,
				getIdsLoan
			);

			return generateLoanLibrary({
				id_service,
				id_document,
				id_library: await getRandomId(getTotalLibrary, getIdsLibrary),
				id_library2: await getRandomId(getTotalLibrary, getIdsLibrary),
			});
		},
		amount: TOTAL_AMOUNT,
	},
	fine: {
		tableName: "fine",
		table: fine,
		generateFn: async () => {
			const { id_service, id_document } = await getRandomId(
				getTotalLoan,
				getIdsLoan
			);
			return generateFine({ faker, id_service, id_document });
		},
		amount: TOTAL_AMOUNT,
	},
};
