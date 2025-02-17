create view documents_from_collection_x as
(
select document.*
from document
         join collection_document on document.id_document = collection_document.id_document
         join collection on collection_document.id_collection = collection.id_collection
where collection.name_collection = 'Colección de Historia de Cuba');


create view amount_document_patrimony_per_type as
(
select type_document, count(*)
from document
where is_patrimony = true
group by type_document);


create view students_age_average as
(
select avg(age) as age_average
from member
         join student on member.id_member = student.id_member);
