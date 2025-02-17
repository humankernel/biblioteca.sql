-- 1. hubo un problema con el frontend que causa que la edad de los estudiantes de Cuba
-- al llenar el formulario se registrase 1 ano menos, adicionalmente mostrar los ids de estos
-- para arreglar esto se hizo uso de cursores
create or replace function fix_age()
    returns setof int as
$$
declare
    curs cursor for select *
                    from member
                    where country = 'Cuba'
                      and category = 'student';
begin
    for r in curs
        loop
            update member set age = age + 1 where current of curs;
            return next r.id_member;
        end loop;
end ;
$$ language plpgsql;



-- 2. se a detectado que las imagenes registrados por la editorial "Halvorson LLC" son en realidad
-- imagenes de mapas por lo que estas deben ser transferidas a la tabla mapas y su nueva escala sera
-- 1000x1000 y el tipo de mapa sera fisico
-- ademas se desea retornar los ids de estas fotos para ser re-validadas por la cache de la aplicacion
-- cliente
create or replace function change_location(edit varchar)
    returns setof int as
$$
declare
    curs cursor for (select id_document
                     from document
                     where editorial = edit);
    id  int;
    pic picture;
begin
    open curs;
    loop
        fetch curs into id;
        exit when not found;

        select * into pic from picture where id_document = id;
        if found then
            insert into map (id_document, dimension_height, dimension_width, scale, type_map)
            values (id, pic.dimension_height, pic.dimension_width, '1000x1000', 'physical');

            delete from picture where id_document = id;
            return next id;
        end if;
    end loop;
    close curs;
end;
$$ language plpgsql;


-- 3. se desea subir el precio de la multa a todos los prestamos que han estado mas de 100 dias
-- sin ser devueltos pasado la fecha de entrega
create or replace function increase_fee()
    returns setof fine as
$$
declare
    curs cursor for (select *
                     from fine
                     where (id_service, id_document) in (select id_service, id_document
                                                         from loan
                                                         where end_date - current_date >= 100)) for update;
    f fine;
begin
    open curs;
    loop
        fetch curs into f;
        exit when not found;

        update fine set fee = fee + 200 where current of curs;
        return next f;
    end loop;
    close curs;
end;
$$ language plpgsql;


-- 4. Bob es un empleado que era el encargado de registrar los prestamos y de estos el
-- plazo de entrega ("term") pero algunas personas tienen un plazo que acaba un dia feriado
-- quitandole la posibilidad a la persona de poder emplear al completo su plazo
-- entonces se requiere que implementes un cursor que actualize el plazo de las pesonas cuya fecha
-- de inicio + plazo caigan en el dia feriado determinado. (PD: Bob obviamente fue despedido)
create or replace function fix_term(d date)
    returns setof loan as
$$
declare
    curs cursor for (select *
                     from loan
                     where (start_date + (term || 'days')::interval)::date = d) for update;
    l loan;
begin
    open curs;
    loop
        fetch curs into l;
        exit when not found;

        update loan set term = term + 1 where current of curs;

        return next l;
    end loop;
    close curs;
end;
$$ language plpgsql;

select fix_term(d := '2023-09-12');

-- 5. se desea para el frontend de al Biblioteca Nacional realizar una paginacion
-- dado un limite de pagina y una pagina. Esta vez tuvieron que recontratar a Bob
-- dado que es el unico que sabe de cursores

create or replace function pagination(page_no int, page_size int)
    returns setof book as
$$
declare
    curs cursor for (select *
                     from book
                     order by id_document);
    b book;
    i int := (page_no - 1) * page_size;
begin
    open curs;
    move forward i from curs;

    for j in 1..page_size
        loop
            fetch curs into b;
            exit when not found;

            return next b;
        end loop;
    close curs;
end;
$$ language plpgsql;

select  pagination(page_no := 9, page_size := 5)

-- Bob completo la asignacion y posteriormente fue despedido porque nadie perdona su error anterior


