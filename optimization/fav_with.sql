-- 1.
-- mostrar los datos de los prestamos (id_document, id_service, fecha inicio, fecha entrega)
-- asi como la prioridad  de los prestamos que se entregan en un mismo dia
-- con 1 la mas alta que tendra el que mas tiempo a estado prestado (pueden haber empates)
-- plain sql
explain analyze
select id_document,
       id_service,
       start_date,
       end_date,
       (select count(distinct term) + 1
        from loan l2
        where l2.end_date = l1.end_date
          and l2.term > l1.term) as priority
from loan l1;

-- fav
explain analyze
select loan.id_document,
       loan.id_service,
       loan.start_date,
       loan.end_date,
       rank() over (partition by end_date order by term desc) as priority
from loan
order by end_date desc;

-- with
explain analyze
with ranking as (select id_service,
                        id_document,
                        rank() over (partition by end_date order by term desc) as priority
                 from loan)
select loan.id_document, loan.id_service, start_date, end_date, priority
from loan
         join ranking on loan.id_service = ranking.id_service
    and loan.id_document = ranking.id_document;

-- TODO: este with esta mal
explain analyze
with priority as (select id_document,
                         id_service,
                         rank() over (partition by end_date order by term desc) as ranking
                  from loan)
select loan.id_document, loan.id_service, start_date, end_date, ranking
from loan
         join priority on loan.id_document = priority.id_document and loan.id_service = priority.id_service;

-- 2.
-- obtener los datos (nombre, edad, pais, escuela) de los estudiantes jovenes (20 <= edad <= 40)
-- universitarios asi como el promedio de edad de los estudiantes de cualquier edad
explain analyze
select m1.id_member,
       name,
       age,
       country,
       school,
       (select avg(age)
        from member m2
        where m1.country = m2.country
          and m1.category = 'student') as average_age
from member m1
         join student on m1.id_member = student.id_member
where age between 20 and 40
  and school like 'University%';

explain analyze
select member.id_member,
       name,
       age,
       country,
       school,
       avg(age) over (partition by country) as average_age
from member
         join student on member.id_member = student.id_member
where age between 20 and 40
  and school like 'University%';

explain analyze
with average_age_per_country as (select country, avg(age) as average_age
                                 from member
                                 group by country)
select member.id_member,
       name,
       age,
       member.country,
       school,
       average_age
from member
         join student on member.id_member = student.id_member
         join average_age_per_country on member.country = average_age_per_country.country
where school like 'University%';


-- 3
-- se desea conocer el titulo, fecha de creacion, formato y promedio de duracion
-- de las ultimas 5 canciones anadidas a su catalogo, y la duracion
-- total segun el genero al que pertenezcan

-- plain sql
explain analyze
select title,
       created_at,
       format,
       genre,
       (select avg(last_five_documents.duration)
        from (select duration
              from document d2
                       join media m2 on d2.id_document = m2.id_document
              where d2.created_at <= d1.created_at
              order by d2.created_at desc
              limit 5) as last_five_documents) as average_duration,
       (select sum(m2.duration)
        from document d2
                 join media m2 on d2.id_document = m2.id_document
        where m2.genre = m1.genre)             as total_per_genre
from document d1
         join media m1 on d1.id_document = m1.id_document;


-- TODO: importante notar que esto no funcionara debido al orden de ejecucion
select avg(duration)
from document
         join media on document.id_document = media.id_document
where created_at <= '2024-01-01'
order by created_at desc
limit 5;

select avg(duration)
from (select duration
      from document
               join media on document.id_document = media.id_document
      where extract(year from created_at) <= '2023'
      order by created_at desc
      limit 5) as last_five_documents;

-- fav
explain analyze
select title,
       created_at,
       format,
       genre,
       avg(duration) over (order by created_at desc rows between 5 preceding and current row ) as average_duration,
       sum(duration) over (partition by genre)                                                 as average_duration_per_genre
from document
         join media on document.id_document = media.id_document;

-- with
explain analyze
with average_duration as (select document.id_document,
                                 genre,
                                 avg(duration) over (order by created_at desc rows 5 preceding) as average
                          from document
                                   join media on document.id_document = media.id_document),
     total_duration_per_genre as (select genre, sum(duration) as total_duration
                                  from media
                                  group by genre)
select title,
       created_at,
       format,
       ad.genre,
       average,
       total_duration
from document d
         join average_duration ad on d.id_document = ad.id_document
         join total_duration_per_genre td on ad.genre = td.genre;


-- 4. done
-- se desea saber la cantidad de deuda que tiene una empresa en total
-- plain sql
explain analyze
select f.id_fine,
       f.id_document,
       f.id_service,
       p.organization,
       (select sum(fee)
        from fine f2
                 join loan_professional lp2 on f2.id_service = lp2.id_service
            and f2.id_document = lp2.id_document
                 join professional p2 on lp2.id_member = p2.id_member
            and f2.id_document = lp2.id_document
        where p2.organization = p.organization) as total_fee
from fine f
         join loan_professional lp on f.id_service = lp.id_service
    and f.id_document = lp.id_document
         join professional p on lp.id_member = p.id_member
    and f.id_document = lp.id_document;

-- fav
explain analyze
select id_fine,
       f.id_document,
       f.id_service,
       p.organization,
       sum(fee) over (partition by p.organization) as total_fee
from fine f
         join loan_professional lp on f.id_service = lp.id_service
    and f.id_document = lp.id_document
         join professional p on lp.id_member = p.id_member
    and f.id_document = lp.id_document;

-- with
explain analyze
with total_fee_per_organization as (select organization, sum(fee) as total
                                    from fine f
                                             join loan_professional lp on f.id_service = lp.id_service
                                        and f.id_document = lp.id_document
                                             join professional p on lp.id_member = p.id_member
                                        and f.id_document = lp.id_document
                                    group by organization)
select f.id_fine, f.id_document, f.id_service, tf.total
from fine f
         join loan_professional lp on f.id_service = lp.id_service
    and f.id_document = lp.id_document
         join professional p on lp.id_member = p.id_member
    and f.id_document = lp.id_document
         join total_fee_per_organization tf on p.organization = tf.organization;


-- 5. se desea saber por el ancho y alto promedio por lugar de cada foto asi como el lugar, formato
-- titulo y id

-- plain sql
explain analyze
select d.id_document,
       title,
       format,
       publication_place,
       (select avg(p2.dimension_height)
        from document d2
                 join picture p2 on d2.id_document = p2.id_document
        where d2.publication_place = d.publication_place) as average_height,
       (select avg(p2.dimension_width)
        from document d2
                 join picture p2 on d2.id_document = p2.id_document
        where d2.publication_place = d.publication_place) as average_width
from document d
         join picture p on d.id_document = p.id_document;

-- with
explain analyze
with averate_height as (select publication_place, avg(dimension_height) as avg_height
                        from document
                                 join picture on document.id_document = picture.id_document
                        group by publication_place),
     averate_width as (select publication_place, avg(dimension_width) as avg_width
                       from document
                                join picture on document.id_document = picture.id_document
                       group by publication_place)
select document.id_document, title, format, averate_width.publication_place, avg_height, avg_width
from document
         join averate_height on document.publication_place = averate_height.publication_place
         join averate_width on document.publication_place = averate_width.publication_place;


-- fav
explain analyze
select document.id_document,
       title,
       format,
       publication_place,
       avg(dimension_width) over (partition by publication_place)  as average_width,
       avg(dimension_height) over (partition by publication_place) as average_height
from document
         join picture on document.id_document = picture.id_document;



-- NEW
-- 6. para todos los prestamos mostrar el id_servicio, id_document, fecha de inicio, fecha final
-- y diferencia promedio entre la fecha de entrega y el plazo de entrega de todos los prestamos
-- de la misma fecha de inicio
explain analyze
select l.id_service,
       l.id_document,
       l.start_date,
       l.end_date,
       l.term,
       (select avg(term)
        from loan l2
        where l2.id_service = l.id_service
          and l2.id_document = l.id_document) as term_avg
from loan l;

explain analyze
select id_service, id_document, start_date, end_date, term, avg(term) over (partition by start_date)
from loan;

explain analyze
with foo as (select start_date, avg(term) as term_avg
             from loan
             group by start_date)
select id_service, id_document, loan.start_date, end_date, term, term_avg
from loan
         join foo on loan.start_date = foo.start_date;


-- 7. mostrar los mapas y el promedio de las dimensiones de estos
explain analyze
select id_document,
       dimension_width,
       dimension_height,
       (select avg(dimension_width)
        from map) as width_avg,
       (select avg(dimension_height)
        from map) as height_avg
from map;

explain analyze
select id_document, dimension_width, dimension_height, avg(dimension_width) over (), avg(dimension_height) over ()
from map;

explain analyze
with w_avg as (select avg(dimension_width) as width_avg
               from map),
     h_avg as (select avg(dimension_height) as height_avg
               from map)
select map.id_document, dimension_width, dimension_height, w_avg.width_avg, h_avg.height_avg
from map,
     w_avg,
     h_avg;


-- 8. mostrar por documentos de la editorial Halvorson LLC sus datos y el ano promedio de creacion de estos si son de la misma editorial
explain analyze
select id_document,
       title,
       created_at,
       editorial,
       (select avg(extract(year from created_at)) from document d2 where d2.editorial = d1.editorial)
from document d1
where editorial = 'Halvorson LLC';


explain analyze
select id_document, title, created_at, editorial, avg(extract(year from created_at)) over (partition by editorial)
from document
where editorial = 'Halvorson LLC';


explain analyze
with created_avg as (select editorial, avg(extract(year from created_at)) as c_avg from document group by editorial)
select id_document, title, created_at, document.editorial, c_avg
from document
         join created_avg on created_avg.editorial = document.editorial
where document.editorial = 'Halvorson LLC';



-- 9. mostrar el ranking de los miembros a partir de su edad segun su pais sin coinciden tendran el
-- mismo numero y por ej si tienes 2 con la edad 18 y un 3r con edad 19 seria (1, 1, 3)
explain analyze
select *,
       (select count(distinct age) + 1
        from member m2
        where m2.country = m1.country
          and m2.age < m1.age) as rank
from member m1
order by age, rank;

explain analyze
select *, dense_rank() over (partition by country order by age)
from member;

explain analyze
with ranked_members as (select *, dense_rank() over (partition by country order by age)
                        from member)
select *
from ranked_members;


-- 10. mostrar los datos de las canciones y el promedio de la duracion entre las que son del mismo genero
explain analyze
select id_document,
       performer,
       composer,
       genre,
       duration,
       (select avg(duration) from music m2 where m2.genre = m1.genre) as duration_avg
from music m1;


explain analyze
select id_document, performer, composer, genre, duration, avg(duration) over (partition by genre)
from music;


explain analyze
with duration_avg_genre as (select genre, avg(duration) as duration_avg
                            from music
                            group by genre)
select id_document, performer, composer, music.genre, duration, duration_avg
from music
         join duration_avg_genre on music.genre = duration_avg_genre.genre;

