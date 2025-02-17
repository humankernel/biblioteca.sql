-- inserción de datos:
-- ¿cómo se agregaría un nuevo documento a la base de datos, asegurando que se vincule correctamente con la colección correspondiente?
insert into collection (id_collection, id_room, name_collection, description_collection)
values ('', '', 'colección de historia de cuba', 'libros y documentos sobre la historia de cuba'),
       ('', '', 'colección de literatura infantil', 'libros de cuentos y novelas para niños'),
       ('', '', 'colección de música cubana', 'partituras y grabaciones de música cubana'),
       ('', '', 'colección de arte cubano', 'libros y catálogos de arte cubano');

insert into collection_document (id_collection, id_document)
values (1, 1),
       (2, 2),
       (3, 3);

insert into "document" (title, created_at, editorial, publication_place, language, format, subject,
                        summary, is_patrimony, note, type_document)
values ('historia de cuba', '2023-01-01', 'editorial nacional', 'la habana', 'es', 'physical', 'historia',
        'un libro sobre la historia de cuba', false, 'book'),
       ('cuentos para niños', '2023-01-01', 'editorial nacional', 'la habana', 'es', 'physical', 'literatura infantil',
        'un libro de cuentos para niños', false, 'el libro esta parcialmente danado', 'book'),
       ('música cubana', '2023-01-01', 'editorial musical', 'la habana', 'es', 'digital', 'música',
        'una grabación de música cubana', false, 'music');

-- ¿cuál sería el proceso para registrar un nuevo autor junto con su respectivo documento?
insert into "author" (name_author, country_author, description_author)
values ('josé martí', 'cuba',
        'josé martí was a cuban poet, essayist, and journalist who became a key figure in the fight for cuba''s' ||
        ' independence from spanish rule. his literary works and political writings had a profound impact on the ' ||
        'cultural and political landscape of cuba.'),
       ('alejo carpentier', 'estados unidos',
        'alejo carpentier, born in cuba and later residing in various countries ' ||
        'including the united states, was a prominent novelist and musicologist. ' ||
        'his works, often associated with magical realism, explore the rich cultural history of latin america'),
       ('nicolás guillén', 'cuba',
        'nicolás guillén, a renowned cuban poet, is considered one of the founders of afro-cuban poetry. ' ||
        'his writings often reflect themes of social justice, identity, and the afro-cuban experience, ' ||
        'making him a significant figure in caribbean literature'),
       ('dulce maría loynaz', 'cuba', 'dulce maría loynaz, a cuban poet and narrative writer, was known ' ||
                                      'for her eloquent and introspective works. she received acclaim for ' ||
                                      'her poetic exploration of human emotions and the complexities of the human experience'),
       ('reinaldo arenas', 'argentina',
        'reinaldo arenas, originally from cuba and later exiled to the united states, ' ||
        'was a novelist and poet. his works often dealt with themes of freedom, ' ||
        'oppression, and his personal experiences, providing a powerful voice against ' ||
        'censorship and political persecution.');

insert into document (title, created_at, editorial, publication_place, language, format, subject, summary, is_patrimony,
                      note, type_document)
values ('cien años de soledad', '1967-05-30', 'editorial sudamericana', 'buenos aires', 'es', 'physical',
        'fiction',
        'one hundred years of solitude is a landmark novel that tells the multi-generational story of the buendía family in the fictional town of macondo.',
        false, 'classic of latin american literature', 'book'),

       ('guantanamera', '1995-09-01', 'columbia records', 'new york', 'es', 'digital', 'music',
        'guantanamera is a famous cuban song, and in this recording, it is performed by celia cruz. the song is a symbol of cuban culture and has gained international recognition.',
        false, 'iconic cuban music', 'music'),

       ('the kingdom of this world', '1949-01-01', 'faber and faber', 'london', 'en', 'physical',
        'historical fiction',
        'the kingdom of this world, written by alejo carpentier, is a novel that explores the history of haiti and the haitian revolution. carpentier is known for his use of magical realism in literature.',
        false, 'magical realism in historical context', 'book'),

       ('motivational speech', '2022-06-15', 'self-published', 'online', 'en', 'digital', 'motivation',
        'a powerful motivational speech by josé martí, encouraging individuals to strive for freedom, justice, and self-improvement.',
        false, 'inspiring words for personal growth', 'media'),

       ('selected poems', '1964-10-20', 'university of minnesota press', 'minneapolis', 'en', 'physical', 'poetry',
        'nicolás guillén, one of the most significant poets in cuban literature, presents a collection of his selected poems that reflect his commitment to social justice and the afro-cuban experience.',
        true, 'legacy of afro-cuban poetry', 'book');

insert into author_document (id_author, id_document)
values (1, 1), -- josé martí and cien años de soledad
       (2, 2), -- alejo carpentier and guantanamera
       (2, 3), -- alejo carpentier and the kingdom of this world
       (1, 4), -- josé martí and motivational speech
       (3, 5);


-- eliminación de datos:
-- ¿cómo se eliminaría un miembro de la biblioteca, considerando todas las tablas relacionadas, como préstamos y servicios asociados?
insert into member (id_member, name, age, country, category)
values (10000000, 'maria rodriguez', 32, 'cuba', 'researcher'),
       (20000000, 'john smith', 25, 'united states', 'student'),
       (30000000, 'anna lee', 40, 'cuba', 'professional');

insert into researcher (id_member)
values (10000000);

insert into professional (id_member, organization)
values (30000000, 'organizacion');

insert into student (id_member, school)
values (30000000, 'university of arts');


delete
from member
where name in ('maria rodriguez', 'john smith', 'anna lee');

alter table researcher
    drop constraint fk_member;
alter table researcher
    add constraint fk_member
        foreign key (id_member) references member (id_member) on delete cascade;

alter table professional
    drop constraint fk_member;
alter table professional
    add constraint fk_member
        foreign key (id_member) references member (id_member) on delete cascade;

alter table student
    drop constraint fk_member;
alter table student
    add constraint fk_member
        foreign key (id_member) references member (id_member) on delete cascade;


-- actualización de datos:

-- ¿cómo se actualizaría la información de una sala, incluyendo su descripción y ubicación?
insert into room (id_room, id_library, name_room, location_room, description_room, access_method, phone_extension)
values ('abc 1234-5678-0', 1, 'sala de lectura', 'planta baja', 'sala principal para la lectura de libros',
        'member card', 1234);

update room
set description_room = 'nueva descripción',
    location_room    = 'nueva ubicación'
where id_room = 'abc 1234-5678-9';


-- ¿cuál sería el procedimiento para modificar la información de un préstamo en curso, como cambiar el estado o la fecha de devolución?
-- insertamos un servicio
insert into service (id_service, description_service, type_service)
values (10000000, 'préstamo de libros', 'loan');

-- insertamos un documento
insert into document (id_document, title, created_at, editorial, publication_place, language, format, subject, summary,
                      is_patrimony,
                      note, type_document)
values (10000000, 'el quijote', '1605-01-01', 'francisco de robles', 'madrid', 'español', 'digital', 'novela',
        'resumen de el quijote', false, 'nota sobre el quijote', 'book');

-- insertamos un préstamo
insert into loan (id_service, id_document, term, start_date, end_date, status, type_loan)
values (10000000, 10000000, 30, '2023-11-28', '2023-12-28', 'approved', 'loan_member');

update loan
set status = 'in-loan'
where id_service = 10000000
  and id_document = 10000000;

-- consulta de datos:

-- ¿cuál es la lista de documentos disponibles en una colección específica?
insert into collection (id_collection, id_room, name_collection, description_collection)
values ('aaa-1111', 'abc 1234-5678-9', 'colección de historia de cuba',
        'libros y documentos sobre la historia de cuba');

insert into "document" (id_document, title, created_at, editorial, publication_place, language, format, subject,
                        summary, is_patrimony, note, type_document)
values (10000001, 'doc', '2023-01-01', 'editorial nacional', 'la habana', 'es', 'physical', 'historia',
        'un libro sobre la historia de cuba', false, 'note', 'book');

insert into collection_document (id_collection, id_document)
values ('aaa-1111', 10000001);

select *
from document
         join collection_document on document.id_document = collection_document.id_document
         join collection on collection_document.id_collection = collection.id_collection
where collection.name_collection = 'colección de historia de cuba'
order by name_collection
limit 10;

-- ¿cómo se obtendrían los detalles de un préstamo en particular, incluyendo su estado y fechas asociadas?
select *
from loan
where id_service = 10000000
  and id_document = 10000000;

-- ¿cuál es la cantidad de documentos disponibles en formato digital en toda la biblioteca?
select count(*)
from document
where format = 'digital';