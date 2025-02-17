import { Faker } from "@faker-js/faker";
import { pickRandom } from "../../utils/pick-random";
import { format_type, document_type, map_type, technique_type } from "./schema";
import {
	DocumentInsert,
	DocumentCollectionInsert,
	ManuscriptInsert,
	MapInsert,
	PictureInsert,
	PaintInsert,
	MediaInsert,
	MusicInsert,
	ReferenceInsert,
	MagazineInsert,
	BookInsert,
	DocumentSelect,
} from "./types";
import { CollectionSelect } from "../collection";

export const generateDocument = async (
	faker: Faker
): Promise<DocumentInsert> => ({
	title: faker.lorem.sentence(10),
	created_at: faker.date.past().toString(),
	editorial: faker.company.name(),
	publication_place: faker.location.city(),
	language: pickRandom(["es", "en", "fr", "de", "it", "ru"]),
	format: pickRandom(format_type.enumValues),
	subject: faker.lorem.sentence(10),
	summary: faker.lorem.paragraph(10),
	is_patrimony: faker.datatype.boolean(),
	note: faker.lorem.paragraph(10),
	type_document: pickRandom(document_type.enumValues),
});

type GenerateDocumentCollection = {
	id_document: DocumentSelect["id_document"];
	id_collection: CollectionSelect["id_collection"];
};

export const generateDocumentCollection = async ({
	id_document,
	id_collection,
}: GenerateDocumentCollection): Promise<DocumentCollectionInsert> => ({
	id_document,
	id_collection,
});

type GenerateSpecialization = {
	faker: Faker;
	id_document: DocumentSelect["id_document"];
};

export const generateManuscript = async ({
	faker,
	id_document,
}: GenerateSpecialization): Promise<ManuscriptInsert> => ({
	id_document,
	period: faker.lorem.sentence(10),
});

export const generateMap = async ({
	faker,
	id_document,
}: GenerateSpecialization): Promise<MapInsert> => ({
	id_document,
	dimension_height: faker.number.int(10000),
	dimension_width: faker.number.int(10000),
	scale: `${faker.number.int(1000)}:${faker.number.int(1000)}`,
	type_map: pickRandom(map_type.enumValues),
});

export const generatePicture = async ({
	faker,
	id_document,
}: GenerateSpecialization): Promise<PictureInsert> => ({
	id_document,
	dimension_height: faker.number.int(10000),
	dimension_width: faker.number.int(10000),
});

export const generatePaint = async ({
	faker,
	id_document,
}: GenerateSpecialization): Promise<PaintInsert> => ({
	id_document,
	technique: pickRandom(technique_type.enumValues),
	dimension_height: faker.number.int(10000),
	dimension_width: faker.number.int(10000),
});

export const generateMedia = async ({
	faker,
	id_document,
}: GenerateSpecialization): Promise<MediaInsert> => ({
	id_document,
	genre: faker.lorem.sentence(10),
	director: faker.person.fullName(),
	producer: faker.person.fullName(),
	duration: faker.number.int(10000),
});

export const generateMusic = async ({
	faker,
	id_document,
}: GenerateSpecialization): Promise<MusicInsert> => ({
	id_document,
	genre: faker.music.genre(),
	performer: faker.person.fullName(),
	composer: faker.person.fullName(),
	duration: faker.number.int(10000),
});

export const generateReference = async ({
	faker,
	id_document,
}: GenerateSpecialization): Promise<ReferenceInsert> => ({
	id_document,
	serial: faker.number.int(10000),
});

export const generateMagazine = async ({
	faker,
	id_document,
}: GenerateSpecialization): Promise<MagazineInsert> => ({
	id_document,
	editor: faker.person.fullName(),
	issn: `${faker.number.int({ min: 1000, max: 9999 })}-${faker.number.int({
		min: 1000,
		max: 9999,
	})}`,
});

export const generateIssn = async (faker: Faker): Promise<string> => {
	const prefix = faker.number.int({ min: 1000, max: 9999 });
	const suffix = faker.number.int({
		min: 1000,
		max: 9999,
	});
	return `${prefix}-${suffix}`;
};

export const generateBook = async ({
	faker,
	id_document,
}: GenerateSpecialization): Promise<BookInsert> => ({
	id_document,
	genre: faker.lorem.word(10),
	issn: await generateIssn(faker),
	isbn: faker.commerce.isbn(),
	dewey: faker.number.float({
		min: 100,
		max: 999,
		precision: 3,
	}),
});
