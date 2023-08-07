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
)