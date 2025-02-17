import { Faker } from "@faker-js/faker";
import { LibraryInsert } from ".";

export const generateLibrary = async (
	faker: Faker
): Promise<LibraryInsert> => ({
	name_library: faker.helpers.fake(`Biblioteca {{person.fullName()}}`),
	location_library: faker.location.streetAddress(true),
	description_library: faker.lorem.paragraph(),
	website: faker.internet.url(),
});
