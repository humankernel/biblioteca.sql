import { Faker } from "@faker-js/faker";
import { CollectionInsert, CollectionSelect, collection_type } from ".";
import { pickRandom } from "../../utils/pick-random";
import { RoomSelect } from "../room";

export const generateIdCollection = async (
	faker: Faker
): Promise<CollectionSelect["id_collection"]> => {
	const randomId = faker.string.alpha({ length: 3, casing: "upper" });
	const randomDigits = faker.number.int({ min: 1111, max: 9999 });
	return `${randomId}-${randomDigits}`;
};

type GenerateCollection = { faker: Faker; id_room: RoomSelect["id_room"] };

export const generateCollection = async ({
	faker,
	id_room,
}: GenerateCollection): Promise<CollectionInsert> => ({
	id_collection: await generateIdCollection(faker),
	id_room,
	name_collection: `Colección de ${faker.company.name()}`,
	description_collection: faker.lorem.paragraph(),
	type_collection: pickRandom(collection_type.enumValues),
});
