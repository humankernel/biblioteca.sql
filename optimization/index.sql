-- busquedas de texto

-- text-search: %substring%
-- selectivity(name_author): 0.90788
select (count(distinct name_author)::float / count(*)::float)
           as selectivity
from author;

-- method 1: 12ms -> 12ms
drop index idx_author_name_1;
create index concurrently idx_author_name_1
    on author using btree (name_author);

-- method 2: 12ms -> 0.212ms
drop index idx_author_name_2;
create index concurrently idx_author_name_2 on author using gin
    (to_tsvector('spanish', name_author));

-- method 3: 12ms -> 0.307ms
create extension if not exists pg_trgm;
drop index idx_author_name_btr;
create index idx_author_name_btr on author using gin (name_author gin_trgm_ops);

explain analyze
select *
from author
where name_author like '%Wendy%';

explain analyze
select *
from author
where to_tsvector('spanish', name_author) @@ to_tsquery('spanish', '%wendy%');

-- text-search: substring% 12ms -> prefix=0.036  previous=0.623ms
drop index idx_author_name_prefix;
create index concurrently idx_author_name_prefix on author using btree
    (name_author text_pattern_ops);

explain analyze
select * from author where name_author like 'wendy%';


-- range-query: 14ms -> 6ms
drop index idx_member_age;
create index idx_member_age on member using btree (age);

explain analyze
select * from member where age between 20 and 35;


-- direct search: 3ms -> 0.032ms
drop index idx_room_location;
create index idx_room_location on room using hash (location_room);

explain analyze
select *
from room
where location_room = 'Sala Yost, Cremin and Dickens';


-- data sort: 117ms ->
drop index idx_book_title;
cluster document using idx_book_title;
create index idx_book_title on document using btree (title asc);

explain analyze
select book.id_document, title
from book
         join document on book.id_document = document.id_document
order by title;


