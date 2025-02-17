import { tables } from "../tables";
import { KeysPool } from "./pool";

export function cacheKeys(
	pool: KeysPool,
	tableName: keyof typeof tables,
	value: any
): void {
	if (tableName === "phone") {
		pool.addKey(tableName, value["phone_number"]);
	} else if (tableName === "phone_room") {
		pool.addKey(tableName, value["phone_number"]);
	} else if (tableName === "phone_library") {
		pool.addKey(tableName, value["phone_number"]);
	} else if (tableName === "library") {
		pool.addKey(tableName, value["id_library"]);
	} else if (tableName === "email") {
		pool.addKey(tableName, value["email"]);
	} else if (tableName === "email_collection") {
		pool.addKey(tableName, { email: value["email"], id_collection:value['id_collection'] });
	} else if (tableName === "email_room") {
		pool.addKey(tableName, { email: value["email"], id_room:value['id_room'] });
	} else if (tableName === "collection") {
		pool.addKey(tableName, value['id_collection']);
	} else if (tableName === "document_collection") {
		pool.addKey(tableName, {id_document: value['id_document'], id_collection: value['id_collection']});
	} else if (tableName === "fine") {
		pool.addKey(tableName, value['id_fine']);
	} else if (tableName === "loan") {
		pool.addKey(tableName, {id_service: value['id_loan'],
            id_document: value['id_document']});
	} else if (tableName === "loan_library" ) {
		pool.addKey(tableName, value['id_library']);
	} else if (tableName === "loan_professional" || tableName === "loan_researcher") {
		pool.addKey(tableName, {id_loan: value["id_loan"], id_member: value['id_member']});
	} else if (tableName === "paint") {
		pool.addKey(tableName, value['id_document']);
	} else if (tableName === "room") {
		pool.addKey(tableName, value['id_document']);
	} else if (tableName === "service_room") {
		pool.addKey(tableName, {id_service: value['id_service'], id_room: value['id_room']});
	}
}
