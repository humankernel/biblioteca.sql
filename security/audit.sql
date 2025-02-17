create table db_change_audit
(
    change_id   bigserial primary key,
    change_time timestamp,
    user_name   varchar(50),
    table_name  varchar(50)
);

create function fn_audit()
    returns trigger as
$$
begin
    if tg_op = 'INSERT' or tg_op = 'UPDATE' or tg_op = 'DELETE' then
        insert into db_change_audit (change_time, user_name, table_name)
        values (current_timestamp, current_user, tg_table_name);
    end if;
end;
$$ language plpgsql;

create trigger tg_audit
    after insert or update or delete
    on document
    for each row
execute procedure fn_audit();