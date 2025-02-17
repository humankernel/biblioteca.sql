import { test } from "bun:test";
import { db } from "../../../db/db";
import { tables } from "../../../tables";
import {
	book,
	document,
	document_collection,
	magazine,
	manuscript,
	map,
	media,
	music,
	paint,
	picture,
	reference,
} from "../../document";

test("insert: document", async () => {
	const value = await tables.document.generateFn();
	await db.insert(document).values(value);
});

test("insert: document_collection", async () => {
	const value = await tables.document_collection.generateFn();
	await db.insert(document_collection).values(value);
});

test("insert: manuscript", async () => {
	const value = await tables.manuscript.generateFn();
	await db.insert(manuscript).values(value);
});

test("insert: map", async () => {
	const value = await tables.map.generateFn();
	await db.insert(map).values(value);
});

test("insert: picture", async () => {
	const value = await tables.picture.generateFn();
	await db.insert(picture).values(value);
});

test("insert: paint", async () => {
	const value = await tables.paint.generateFn();
	await db.insert(paint).values(value);
});

test("insert: media", async () => {
	const value = await tables.media.generateFn();
	await db.insert(media).values(value);
});

test("insert: music", async () => {
	const value = await tables.music.generateFn();
	await db.insert(music).values(value);
});

test("insert: reference", async () => {
	const value = await tables.reference.generateFn();
	await db.insert(reference).values(value);
});

test("insert: magazine", async () => {
	const value = await tables.magazine.generateFn();
	await db.insert(magazine).values(value);
});

test("insert: book", async () => {
	const value = await tables.book.generateFn();
	await db.insert(book).values(value);
});
