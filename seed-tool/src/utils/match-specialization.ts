import { faker } from "@faker-js/faker";
import { Table } from "drizzle-orm";
import { db } from "../db/db";
import {
	generateBook,
	generateMagazine,
	generateReference,
	generateMusic,
	generateMedia,
	generatePaint,
	generatePicture,
	generateMap,
	generateManuscript,
	DocumentSelect,
	DocumentInsert,
} from "../schema/document";
import {
	generateProfessional,
	generateResearcher,
	generateStudent,
	MemberInsert,
	MemberSelect,
} from "../schema/member";
import { tables } from "../tables";

const documentTypeToFunction = {
	book: generateBook,
	magazine: generateMagazine,
	reference: generateReference,
	music: generateMusic,
	media: generateMedia,
	paint: generatePaint,
	picture: generatePicture,
	map: generateMap,
	manuscript: generateManuscript,
};

const memberCategoryToFunction = {
	professional: generateProfessional,
	researcher: generateResearcher,
	student: generateStudent,
};

export async function matchSpecializations(
	tableName: string,
	value: MemberSelect | DocumentSelect
): Promise<void> {
	if (tableName === "document") {
		const { id_document, type_document } = value as any as DocumentSelect;
		const generateFn = documentTypeToFunction[type_document];
		if (type_document && generateFn) {
			await db
				.insert(tables[type_document].table)
				.values(await generateFn({ faker, id_document }))
				.onConflictDoNothing()
				.catch((err: Error) =>
					console.log(`${type_document} -> ${err.message}`)
				);
		}
	} else if (tableName === "member") {
		const { id_member, category } = value as any as MemberSelect;
		const generateFn = memberCategoryToFunction[category];
		if (category && generateFn) {
			await db
				.insert(tables[category].table)
				.values(await generateFn({ faker, id_member }))
				.onConflictDoNothing()
				.catch((err: Error) =>
					console.log(`${category} -> ${err.message}`)
				);
		}
	}
}
