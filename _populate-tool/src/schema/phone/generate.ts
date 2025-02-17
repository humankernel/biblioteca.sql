import { Faker } from "@faker-js/faker";
import {
	PhoneInsert,
	PhoneLibraryInsert,
	PhoneRoomInsert,
	PhoneSelect,
} from ".";
import { LibrarySelect } from "../library";
import { RoomSelect } from "../room";

const generatePhoneNumber = async (faker: Faker): Promise<string> => {
	const phone_number = `(${faker.number.int(999)}) ${faker.number.int({
		min: 1111,
		max: 9999,
	})}-${faker.number.int({ min: 1111, max: 9999 })}`;
	return phone_number;
};

export const generatePhone = async (faker: Faker): Promise<PhoneInsert> => ({
	phone_number: await generatePhoneNumber(faker),
	description_phone: faker.lorem.sentence(5),
});

type GeneratePhoneLibrary = {
	phone_number: PhoneSelect["phone_number"];
	id_library: LibrarySelect["id_library"];
};

export const generatePhoneLibrary = async ({
	phone_number,
	id_library,
}: GeneratePhoneLibrary): Promise<PhoneLibraryInsert> => ({
	phone_number,
	id_library,
});

type GeneratePhoneRoom = {
	phone_number: PhoneSelect["phone_number"];
	id_room: RoomSelect["id_room"];
};

export const generatePhoneRoom = async ({
	phone_number,
	id_room,
}: GeneratePhoneRoom): Promise<PhoneRoomInsert> => ({
	phone_number,
	id_room,
});
