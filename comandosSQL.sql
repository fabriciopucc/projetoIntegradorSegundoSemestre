use railway;

//Empréstimos
create table emprestimos(
        codigo int primary key auto_increment not null,
        data_emprestimo varchar(20) not null,
        data_devolucao varchar(20),
        fk_codigo_aluno int not null,
        fk_codigo_livro int not null,
        devolvido boolean not null default false,
        foreign key (fk_codigo_aluno) references alunos(codigo),
        foreign key (fk_codigo_livro) references livros(codigo)
);

drop table emprestimos;

select * from emprestimos;

//Livros
create table livros(
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

drop table livros;

select * from livros

//Alunos
create table alunos(
        codigo int primary key not null auto_increment,
        ra int(8) not null unique,
        nome varchar(80) not null,
        cpf varchar(11) not null unique,
        celular varchar(11),
        pontuacao int not null default 0
);

drop table alunos;

select * from alunos;