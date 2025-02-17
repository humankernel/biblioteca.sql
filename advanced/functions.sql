-- 1. se desea una funcion que transforme las entradas de la tabla document
-- a un formato de cuando fue creada y porque editorial
create or replace function created_editorial(created_at date, editorial varchar)
    returns varchar as
$$
begin
    return created_at || ' by ' || editorial;
end;
$$ language plpgsql;

select created_editorial(created_at, editorial)
from document;

-- 2, 3. a Bob se le encomendo para su prueba tecnica la tarea de hacer una funcion
-- que devuelva la extension + numeros de todos los numeros asociados a una sala especifica
create or replace function ext_phone(ext int, phone varchar)
    returns varchar as
$$
begin
    return '(+' || ext || ') ' || phone;
end;
$$ language plpgsql;

create or replace function room_phone(id_r varchar, ext int)
    returns setof varchar as
$$
declare
    fullphone varchar;
begin
    for fullphone in (select ext_phone(ext, phone_number) from phone_room where id_room = id_r)
        loop
            return next fullphone;
        end loop;
end;
$$ language plpgsql;

select room_phone('EAL 1969-7310-X', 53);


-- 4. Dado un id de un miembro de la Biblioteca, se desea saber si esta dentro del rango
-- de jovenes, o adultos o viejos
create or replace function clasification(id int)
    returns varchar as
$$
declare
    range_age varchar;
begin
    select case
               when age <= 35 then 'Young Member'
               when age <= 55 then 'Adult Member'
               else 'Old Member'
               end
    into range_age
    from member
    where id_member = id;

    if not found then
        raise exception 'No member with that id';
    end if;

    return range_age;
end;
$$ language plpgsql;

select clasification(3);

-- 5. Se desea conocer el nombre de todas las bibliotecas a las cuales se les esta
-- prestando documentos
create or replace function libraries_l(id int)
    returns setof varchar as
$$
declare
    name varchar;
begin
    for name in (select name_library
                 from library
                 where id_library in (select id_library2
                                      from loan_library
                                      where id_library = id))
        loop
            return next name;
        end loop;
end;
$$ language plpgsql;

select libraries_l(20);

