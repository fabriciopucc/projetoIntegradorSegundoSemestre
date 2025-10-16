use railway;

create table emprestimos(
        codigo int primary key auto_increment not null,
        data_emprestimo datetime not null,
        codigo_aluno int not null,
        codigo_publicacao int not null,
        devolvido boolean not null default false,
        foreign key (codigo_aluno) references alunos(codigo),
        foreign key (codigo_publicacao) references publicacoes(codigo)
);

drop table emprestimos;

select * from emprestimos;

insert into emprestimos values(default, STR_TO_DATE('2023/12/10 14:30:00', '%Y/%m/%d %H:%i:%s'), 1, 1, false);

select e.codigo as codigo_emprestimo
from alunos a 
inner join emprestimos e on a.codigo = e.codigo_aluno
inner join publicacoes p on p.codigo = e.codigo_publicacao
where a.codigo = 1 and p.codigo = 1 and e.devolvido = false
limit 1;



select count(p.codigo) as quantidade
from alunos a 
inner join emprestimos e on a.codigo = e.codigo_aluno
inner join publicacoes p on p.codigo = e.codigo_publicacao
where a.codigo = 1 and p.codigo = 1 and e.devolvido = false;

delete emprestimos e

create table publicacoes(
        codigo int primary key auto_increment not null,
        etiqueta varchar(20) not null unique,
        isbn varchar(13) not null unique,
        titulo varchar(100) not null,
        sinopse varchar(200) not null,
        genero varchar(50) not null,
        autor varchar(50) not null,
        editora varchar(50) not null,
        ano_publicacao int(4) not null,
        quantidade_exemplares int(6) not null
);

select * from publicacoes

select * from publicacoes where quantidade_exemplares > 0

drop table publicacoes;

create table alunos(
        codigo int primary key not null auto_increment,
        ra int(8) not null unique,
        nome varchar(80) not null,
        cpf varchar(11) not null unique,
        celular varchar(11),
        pontuacao int not null default 0
);

drop table alunos;

insert into alunos values (default, 25000041, "Ana Lima", "37404150884", "19982544396", default);
insert into alunos values (default, 25000042, "Ernandes tavares", "16789351825", "19982544391", default);
insert into alunos values (default, 25000043, "José Pedro", "16789351821", "19982544391", default);
insert into alunos values (default, 25000044, "Beatriz Cardoso", "16789351888", "19982544391", default);

update alunos set pontuacao = 150 where codigo = 3;

select * from alunos;

select * from alunos order by pontuacao desc



