import { faker } from "@faker-js/faker";
import { expect, test } from "bun:test";
import { generateDocument } from "../generate";

// test("document test", async () => {
// 	faker.seed(0);

// 	const actual = await generateDocument(faker);

// 	const expected = {
// 		title: "Inflammatio optio sumo tutamen pax una impedit uberrime curriculum qui.",
// 		created_at:
// 			"Thu Apr 06 2023 10:59:36 GMT+0000 (Coordinated Universal Time)",
// 		editorial: "Kertzmann - Gulgowski",
// 		publication_place: "Barnstable Town",
// 		language: "en",
// 		format: "physical",
// 		subject:
// 			"Vix certe credo demulceo textilis tonsor eveniet denego minus crudelis.",
// 		summary:
// 			"Tubineus aeneus confero alias socius accusator corona tristis vita tergo. Usus usus volutabrum demitto. Thesis deinde eius termes spoliatio angustus suppellex rerum non. Fuga vinco tempora enim. Cuppedia demitto celo. Teres tabula defleo bis. Appositus accusamus commodo quae architecto perspiciatis cado. Crepusculum villa veniam statim defaeco contigo placeat. Veniam subiungo alveus adulescens volubilis sopor. Spargo assumenda bene contabesco aperiam tandem comedo pecus.",
// 		is_patrimony: true,
// 		note: "Molestiae adficio decens reiciendis voveo. Ambitus solitudo bellicus rem arx vulnero solitudo non catena cupio. Demo caries qui articulus confero amor. Sollicito comes aptus tergo auxilium vir corporis somniculosus. Abutor alter qui tum speculum alo volup voluptatibus utrimque. Dolore voluptatibus adsidue pecco defendo tactus. Adflicto decimus cimentarius. Animi contigo clementia denique angustus sto cometes utrum cupio versus. Bis stultus maiores. Uredo cena dolor eos veritatis aliquid verus.",
// 		type_document: "art",
// 	};

// 	expect(actual).toMatchObject(expected);
// });
