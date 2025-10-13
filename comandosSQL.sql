use railway;

create table livros(
        codigo int primary key auto_increment not null,
        nome varchar(100) not null
);

create table alunos(
        codigo int primary key not null auto_increment,
        ra int(8) not null unique,
        nome varchar(80) not null,
        cpf varchar(11) not null unique,
        celular varchar(11) 
);

select * from alunos;

drop table alunos;

insert into alunos values (default, 25000040, "Fabrício", "51672259819", "19984597236")

