-- ensure phone gets removed after phone_room
create function fn_tg_phone_room()
    returns trigger as
$$
begin
    delete from phone where phone.phone_number = old.phone_number;
    return old;
end;
$$ language plpgsql;

create or replace trigger tg_phone_room
    after delete
    on phone_room
    for each row
execute procedure fn_tg_phone_room();


-- ensure email gets removed after email_room
create function fn_tg_email_room()
    returns trigger as
$$
begin
    delete from email where email = old.email;
    return old;
end;
$$ language plpgsql;

create or replace trigger tg_email_room
    after delete
    on email_room
    for each row
execute procedure fn_tg_email_room();


-- ensure service gets removed after service_room
create or replace function fn_tg_service_room()
    returns trigger as
$$
begin
    delete from service where id_room = old.id_room;
    return old;
end;
$$ language plpgsql;

create or replace trigger tg_service_room
    after delete
    on service_room
    for each row
execute procedure fn_tg_service_room();


-- ensure that when a room its deleted it removes his
-- email and phone_number and if a service is been used its doesn't removes
-- the room
create or replace function fn_tg_room_delete()
    returns trigger as
$$
declare
    sr service_room;
begin
    select *
    into sr
    from service_room
             join service_member on service_room.id_service = service_member.id_service
    where service_room.id_room = old.id_room;
    if found then
        raise exception 'Cant delete room cuz members are still using his services';
    end if;

    delete from phone_room where id_room = old.id_room;
    delete from email_room where id_room = old.id_room;
    delete from service_room where id_room = old.id_room;
    return old;
end;
$$ language plpgsql;

create trigger tg_room_delete
    before delete
    on room
    for each row
execute procedure fn_tg_room_delete();


-- store the changes of fee made by someone
create table fine_actions
(
    id_fine        int primary key,
    old_fee        float,
    new_fee        float,
    "user"         varchar,
    date_of_change date
);

create or replace function fn_tg_fee_audit()
    returns trigger as
$$
begin
    if (old.fee <> new.fee) then
        insert into fine_actions (id_fine, old_fee, new_fee, "user", date_of_change)
        values (old.id_fine, old.fee, new.fee, current_user, current_date);
    end if;
    return new;
end;
$$ language plpgsql;

create trigger tg_audit_fee
    before insert or update
        of fee
    on fine
    for each row
execute procedure fn_tg_fee_audit();

update fine
set fee = 1
where id_fine = 1;


-- ensure the fees values are between a defined range
create function fn_tg_check_fees()
    returns trigger as
$$
begin
    raise exception 'Fee value is out of range 10 - 1000';
end;
$$ language plpgsql;

create trigger tg_check_fee
    before insert
    on fine
    for each row
    when (new.fee between 10 and 1000)
execute procedure fn_tg_check_fees();

insert into fine (id_fine, id_service, id_document, penalty, fee)
values (1000001, 169, 22, 'processing fee', 9);

select *
from fine
where id_fine = 1000001;

-- set the start_date of a loan to the current when inserted
create function fn_tg_register_loan_date()
    returns trigger as
$$
begin
    new.start_date = current_date;
    return new;
end;
$$ language plpgsql;

create trigger tg_register_loan_date
    before insert
    on loan
    for each row
execute procedure fn_tg_register_loan_date();

-- ensure that the documents that are patrimony cannot be loan to anyone other that a researcher
create function fn_tg_loan_professional()
    returns trigger as
$$
declare
    is_patrimony int;
begin
    select is_patrimony into is_patrimony from document where id_document = new.id_document;
    if is_patrimony then
        raise exception 'This document cannot be loan because is patrimony';
    end if;
    return new;
end;
$$ language plpgsql;

create trigger tg_document_patrimony
    before insert
    on loan_professional
    for each row
execute procedure fn_tg_loan_professional();

-- user activity on books
create type op as enum ('insert', 'update', 'delete');
create table user_activity
(
    "user" varchar,
    action op,
    date   date
);

create function register_user_activity()
    returns trigger as
$$
begin
    insert into user_activity ("user", action, date) values (current_user, tg_op, current_date);
    return new;
end;
$$ language plpgsql;

create trigger tg_register_user_activity
    after insert or update or delete
    on book
    for each statement
execute procedure register_user_activity();

-- check when inserting into email_library that an email and library actually exists
create function fn_tg_check_email_library()
    returns trigger as
$$
declare
    library library;
    email   email;
begin
    select * into library from library where id_library = new.id_library;
    if not found then
        raise exception 'cannot insert because not library exists that match';
    end if;

    select * into email from email where email = new.email;
    if not found then
        raise exception 'cannot insert because not email exists that match';
    end if;

    return new;
end;
$$ language plpgsql;

create trigger tg_check_email_library
    before insert
    on email_library
    for each row
execute procedure fn_tg_check_email_library();



-- 10 triggers de validacion
create function validate_manuscript()
    returns trigger as
$$
declare
    d document;
begin
    select * into d from document where document.id_document = new.id_document;
    if found then
        raise exception 'There is already a document with the same id';
    end if;
    return new;
end;
$$ language plpgsql;

create trigger tg_manuscript
    before insert
    on manuscript
    for each row
execute procedure validate_manuscript();


create function validate_map()
    returns trigger as
$$
declare
    d document;
begin
    select * into d from document where document.id_document = new.id_document;
    if found then
        raise exception 'There is already a document with the same id';
    end if;

    if new.dimension_width > 10000 or new.dimension_height > 10000 then
        raise exception 'Out of proportion';
    end if;

    return new;
end;
$$ language plpgsql;

create trigger tg_map
    before insert
    on map
    for each row
execute procedure validate_map();



create function validate_media()
    returns trigger as
$$
declare
    d document;
begin
    select * into d from document where document.id_document = new.id_document;
    if found then
        raise exception 'There is already a document with the same id';
    end if;

    if new.duration < 0 or new.duration > 100000 then
        raise exception 'Duration is out of proportion';
    end if;

    return new;
end;
$$ language plpgsql;

create trigger tg_media
    before insert
    on media
    for each row
execute procedure validate_media();


create function validate_music()
    returns trigger as
$$
declare
    d document;
begin
    select * into d from document where document.id_document = new.id_document;
    if found then
        raise exception 'There is already a document with the same id';
    end if;

    if new.duration < 0 or new.duration > 100000 then
        raise exception 'Duration is out of proportion';
    end if;

    return new;
end;
$$ language plpgsql;

create trigger tg_music
    before insert
    on music
    for each row
execute procedure validate_music();


create function validate_room()
    returns trigger as
$$
declare
    r room;
begin
    select * into r from room where id_room = new.id_room;
    if found then
        raise exception 'Already exist a room with the same id';
    end if;

    if new.phone_extension is null or new.phone_extension < 0 then
        raise exception 'Phone Extension is null or in bad format';
    end if;

    return new;
end;
$$ language plpgsql;

create trigger tg_room
    before insert
    on room
    for each row
execute procedure validate_room();


create function validate_phone()
    returns trigger as
$$
declare
    p phone;
begin
    select * into p from phone where phone_number = new.phone_number;
    if found then
        raise exception 'That phone already exists';
    end if;

    return new;
end;
$$ language plpgsql;

create trigger tg_phone
    before insert
    on phone
    for each row
execute procedure validate_phone();

create function validate_loan()
    returns trigger as
$$
declare
    l loan;
begin
    select * into l from loan where id_service = new.id_service and id_document = new.id_document;
    if found then
        raise exception 'Already exists';
    end if;

    if new.term > 1000 then
        raise exception 'Term is too big';
    end if;

    if new.end_date < new.start_date then
        raise exception 'End date can"t be lower than start date';
    end if;

    return new;
end;
$$ language plpgsql;

create trigger tg_loan
    before insert
    on loan
    for each row
execute procedure validate_loan();

create function validate_member()
    returns trigger as
$$
declare
    m member;
begin
    select * into m from member where id_member = new.id_member;
    if found then
        raise exception 'Already exists';
    end if;

    if new.age < 15 or new.age > 150 then
        raise exception 'Member age must be between 15-150 years';
    end if;

    return new;
end;
$$ language plpgsql;

create trigger tg_member
    before insert
    on member
    for each row
execute procedure validate_member();


create function validate_email()
    returns trigger as
$$
declare
    e email;
begin
    select * into e from email where email = new.email;
    if found then
        raise exception 'Already exists';
    end if;

    return new;
end;
$$ language plpgsql;

create trigger tg_email
    before insert
    on email
    for each row
execute procedure validate_email();

create function validate_library()
    returns trigger as
$$
declare
    l library;
begin
    select * into l from library where id_library = new.id_library;
    if found then
        raise exception 'Already exists';
    end if;

    if new.location_library is null then
        raise exception 'Library"s location can"t be null';
    end if;

    return new;
end;
$$ language plpgsql;

create trigger tg_library
    before insert
    on library
    for each row
execute procedure validate_library();
