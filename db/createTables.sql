-- drop table device_details,
-- tokens,
-- users;
create table if not exists users (
    id integer primary key auto_increment,
    name varchar(30) not null,
    email varchar(30) not null unique,
    password varchar (200) not null,
    role varchar(10)
);

create table if not exists tokens (
    id integer primary key auto_increment,
    token varchar(200) not null,
    user_id integer,
    foreign key(user_id) references users(id)
);

create table if not exists device_details (
    id integer primary key auto_increment,
    browser_name varchar(200),
    browser_version varchar(200),
    browser_platform varchar(200),
    connection_date varchar(200),
    token_id integer unique,
    foreign key (token_id) references tokens(id) ON DELETE CASCADE
)