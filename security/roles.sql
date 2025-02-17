-- ROLE: dba
create role dba with
    superuser createdb createrole
    login encrypted password 'admin';

grant all on schema public to dba;
revoke all on schema public from dba;

-- ROLE: audit
create role audit with
    login encrypted password 'audit'
    valid until '2024-10-10';

grant select on db_change_audit to audit;
revoke select on db_change_audit from audit;

-- ROLE: director
create role director with
    login encrypted password 'director'
    role audit;

grant select, update, delete on library, room to director;
revoke select, update, delete on library, room from director;

-- ROLE: principal librarian
create role librarian with
    login encrypted password 'librarian';

grant all
    on collection, document_collection, document, manuscript, map, picture,
    paint, media, music, reference, magazine, book
    to librarian;

revoke all
    on collection, document_collection, document, manuscript, map, picture,
    paint, media, music, reference, magazine, book
    from librarian;

-- ROLE: cataloger
create role cataloger with
    login encrypted password 'cataloger';

grant update
    on collection, document_collection, document, manuscript, map, picture,
    paint, media, music, reference, magazine, book
    to cataloger;

revoke update
    on collection, document_collection, document, manuscript, map, picture,
    paint, media, music, reference, magazine, book
    from cataloger;

-- ROLE: public user
create role public_user;

grant select
    on collection, document_collection, document, manuscript, map, picture,
    paint, media, music, reference, magazine, book, room, phone, email, service
    to public_user;

revoke select
    on collection, document_collection, document, manuscript, map, picture,
    paint, media, music, reference, magazine, book, room, phone, email, service
    from public_user;

-- ROLE: membership_manager
create role membership_manager with
    login encrypted password 'membership_manager';

grant all on member to membership_manager;
revoke all on member from membership_manager;

-- ROLE: member
alter table member
    add column IF NOT EXISTS
        username varchar(50);

-- enable rls
alter table member
    enable row level security;

create policy restricted_access
    on member
    for select
    to member
    using (username = current_user);

create role member;

grant select on member to member;
revoke select on member from member;

