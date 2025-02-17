import { Faker } from "@faker-js/faker";
import { AuthorDocumentInsert, AuthorInsert, AuthorSelect } from ".";
import { pickRandom } from "../../utils/pick-random";
import { DocumentSelect } from "../document";

export const generateAuthor = async (faker: Faker): Promise<AuthorInsert> => ({
	name_author: faker.person.fullName(),
	country_author: pickRandom(["Cuba", faker.location.country()]),
	description_author: faker.lorem.paragraph(),
});

type GenerateAuthorDocument = {
	id_author: AuthorSelect["id_author"];
	id_document: DocumentSelect["id_document"];
};

export const generateAuthorDocument = async ({
	id_author,
	id_document,
}: GenerateAuthorDocument): Promise<AuthorDocumentInsert> => ({
	id_author,
	id_document,
});
