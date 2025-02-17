import { Faker } from "@faker-js/faker";
import { pickRandom } from "../../utils/pick-random";
import { category_type } from "./schema";
import {
	MemberInsert,
	ResearcherInsert,
	ProfessionalInsert,
	StudentInsert,
	MemberSelect,
} from "./types";

export const generateMember = async (faker: Faker): Promise<MemberInsert> => ({
	name: faker.person.fullName(),
	age: faker.number.int({ min: 18, max: 100 }),
	country: pickRandom(["Cuba", faker.location.country()]),
	category: pickRandom(category_type.enumValues),
});

type GenerateResearcher = {
	id_member: MemberSelect["id_member"];
};

export const generateResearcher = async ({
	id_member,
}: GenerateResearcher): Promise<ResearcherInsert> => ({
	id_member,
});

type GenerateMemberSpecialization = {
	faker: Faker;
	id_member: MemberSelect["id_member"];
};

export const generateProfessional = async ({
	faker,
	id_member,
}: GenerateMemberSpecialization): Promise<ProfessionalInsert> => ({
	id_member,
	organization: faker.company.name(),
});

export const generateStudent = async ({
	faker,
	id_member,
}: GenerateMemberSpecialization): Promise<StudentInsert> => ({
	id_member,
	school: `${pickRandom([
		"HighSchool",
		"University",
		"Catholic School",
	])} ${faker.company.name()}`,
});
