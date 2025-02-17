import { Faker } from "@faker-js/faker";
import { pickRandom } from "../../utils/pick-random";
import { access_method_type } from "./schema";
import { RoomInsert } from "./types";
import { LibrarySelect } from "../library";

export const generateIdRoom = async (faker: Faker): Promise<string> => {
	const randomId = faker.string.alpha({ length: 3, casing: "upper" });
	const randomYear = faker.date
		.between({ from: 2000, to: 2022 })
		.getFullYear();
	const randomDigits = faker.number.int({ min: 1111, max: 9999 });
	const randomLetter = faker.string.alpha({ length: 1, casing: "upper" });
	const fullId = `${randomId} ${randomYear}-${randomDigits}-${randomLetter}`;
	return fullId;
};

type GenerateRoom = { faker: Faker; id_library: LibrarySelect["id_library"] };

export const generateRoom = async ({
	faker,
	id_library,
}: GenerateRoom): Promise<RoomInsert> => ({
	id_room: await generateIdRoom(faker),
	id_library,
	name_room: faker.helpers.fake(`Sala {{company.name()}}`),
	location_room: faker.location.streetAddress(true),
	description_room: faker.lorem.paragraph(),
	access_method: pickRandom(access_method_type.enumValues),
	phone_extension: faker.number.int({ min: 100, max: 999 }),
});
