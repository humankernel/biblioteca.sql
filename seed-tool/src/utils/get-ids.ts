import { sql } from "drizzle-orm";
import { PgTable } from "drizzle-orm/pg-core";
import { db } from "../db/db";
import { author } from "../schema/author";
import { collection } from "../schema/collection";
import { email } from "../schema/email";
import { library } from "../schema/library";
import { member, researcher, professional } from "../schema/member";
import { phone } from "../schema/phone";
import { room } from "../schema/room";
import { loan, service } from "../schema/service";
import { document } from "../schema/document";

type GetIds = { id: any; table: PgTable; idField: string };

const getIds = ({ id, idField, table }: GetIds) => {
	return db
		.select({ id })
		.from(table)
		.limit(sql.placeholder("limit"))
		.offset(sql.placeholder("offset"))
		.prepare(idField);
};

const getTotal = (table: PgTable) =>
	db
		.select({ count: sql`COUNT(*)` })
		.from(table)
		.prepare("total_" + table);

export const getTotalAuthors = getTotal(author);
export const getIdsAuthor = getIds({
	id: author.id_author,
	table: author,
	idField: "id_author",
});

export const getTotalCollections = getTotal(collection);
export const getIdsCollection = getIds({
	id: collection.id_collection,
	table: collection,
	idField: "id_collection",
});

export const getTotalDocuments = getTotal(document);
export const getIdsDocument = getIds({
	id: document.id_document,
	table: document,
	idField: "id_document",
});

export const getTotalEmails = getTotal(email);
export const getEmails = getIds({
	id: email.email,
	table: email,
	idField: "email",
});

export const getTotalLibrary = getTotal(library);
export const getIdsLibrary = getIds({
	id: library.id_library,
	table: library,
	idField: "id_library",
});

export const getTotalMember = getTotal(member);
export const getIdsMember = getIds({
	id: member.id_member,
	table: member,
	idField: "id_member",
});

export const getTotalResearcher = getTotal(researcher);
export const getTotalProfessional = getTotal(professional);
export const getIdsResearcher = getIds({
	id: researcher.id_member,
	table: researcher,
	idField: "id_member",
});
export const getIdsProfessional = getIds({
	id: professional.id_member,
	table: professional,
	idField: "id_member",
});

export const getTotalPhone = getTotal(phone);
export const getPhoneNumbers = getIds({
	id: phone.phone_number,
	table: phone,
	idField: "phone",
});

export const getTotalRoom = getTotal(room);
export const getIdsRoom = getIds({
	id: room.id_room,
	table: room,
	idField: "id_room",
});

export const getTotalServices = getTotal(service);
export const getIdsService = getIds({
	id: service.id_service,
	table: service,
	idField: "id_service",
});

export const getTotalLoan = getTotal(loan);
export const getIdsLoan = getIds({
	id: { id_service: loan.id_service, id_document: loan.id_document },
	table: loan,
	idField: "id_loan",
});
