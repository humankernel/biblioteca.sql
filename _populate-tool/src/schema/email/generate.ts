import { Faker } from "@faker-js/faker";
import { EmailCollectionInsert, EmailInsert, EmailLibraryInsert, EmailRoomInsert } from ".";
import { LibrarySelect } from "../library";
import { RoomSelect } from "../room";
import { CollectionSelect } from "../collection";

export const generateEmail = async (faker: Faker): Promise<EmailInsert> => ({
	email: faker.internet
		.email({ allowSpecialCharacters: false })
		.toLocaleLowerCase(),
	description_email: faker.lorem.sentence(5),
});

type GenerateEmailLibrary = {
	email: string;
	id_library: LibrarySelect["id_library"];
};

export const generateEmailLibrary = async ({
	email,
	id_library,
}: GenerateEmailLibrary): Promise<EmailLibraryInsert> => ({
	email,
	id_library,
});

type GenerateEmailRoom = {
	email: string;
	id_room: RoomSelect["id_room"];
};

export const generateEmailRoom = async ({
	email,
	id_room,
}: GenerateEmailRoom): Promise<EmailRoomInsert> => ({
	email,
	id_room,
});

type GenerateEmailCollection = {
	email: string;
	id_collection: CollectionSelect["id_collection"];
};

export const generateEmailCollection = async ({
	email,
	id_collection,
}: GenerateEmailCollection): Promise<EmailCollectionInsert> => ({
	email,
	id_collection,
});
