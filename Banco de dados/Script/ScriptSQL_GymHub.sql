create database GymHub;

use GymHub;

create table usuario(
	idUsuario int primary key auto_increment,
    nome varchar(45) not null,
    email varchar(45) not null,
    senha varchar(255) not null
);

select * from usuario;

create table treino (
	idTreino int primary key auto_increment,
    nome varchar(45) not null,
	fkUsuario int not null,
    constraint fkUsuario_treino foreign key (fkUsuario) references usuario(idUsuario)
);

create table exercicio(
	idExercicio int primary key auto_increment,
    nome varchar(45) not null,
    fkTreino int not null,
    constraint fkTreino_exercicio foreign key (fkTreino) references treino(idTreino)
);

create table registro_treino(
	idRegisTreino int auto_increment,
    fkTreino int not null,
    constraint fkTreino_registro_treino foreign key (fkTreino) references treino(idTreino),
    constraint pkComposta primary key(idRegisTreino, fkTreino),
    fkUsuario int not null,
	constraint fkUsuario_registro_treino foreign key (fkUsuario) references usuario(idUsuario),
    data date not null
);

create table registro_exercicio(
	idRegisExercicio  int auto_increment,
    fkRegisTreino int not null,
    constraint fkRegisTreino_registro_exercicio foreign key (fkRegisTreino) references registro_treino(idRegisTreino),
    constraint pkComposta primary key(idRegisExercicio, fkRegisTreino),
    fkTreino int not null,
	constraint fkTreino_registro_exercicio foreign key (fkTreino) references registro_treino(fkTreino),
    nome varchar(45) not null,
    carga decimal(4, 2) not null,
    series int not null,
    repeticoes int not null,
    data TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
);

insert into usuario(nome, email, senha) values ('Giovanne', 'giovanne3282@gmail.com', '3282');

insert into treino (nome, fkUsuario) values ('Peito e Tríceps', 1);
insert into treino (nome, fkUsuario) values ('Costas e Bíceps', 1);

insert into exercicio (nome, fkTreino) values ('Supino Reto', 1);
insert into exercicio (nome, fkTreino) values ('Crucifixo Inclinado', 1);
insert into exercicio (nome, fkTreino) values ('Tríceps Corda', 1);

insert into exercicio (nome, fkTreino) values ('Puxada Alta', 2);
insert into exercicio (nome, fkTreino) values ('Remada Unilateral', 2);
insert into exercicio (nome, fkTreino) values ('Rosca Direta', 2);


select * from treino;
select * from exercicio;
select * from usuario;
select * from registro_treino;
select * from registro_exercicio;

SET lc_time_names = 'pt_BR'; -- aqui eu coloco a configração para pt-br para retornar os meses em portugues

-- select que retorna a média das cargas dos ultimox X meses de um exercício específico
select date_format(data, '%M') as mes, round(avg(carga), 1) as media_carga
from registro_exercicio
where nome = 'Supino Reto' and data between date_format(curdate() - interval '5' month,  '%Y-%m-01') and now() and fkTreino = '1'
group by date_format(data, '%M'), year(data), month(data)
order by year(data) desc, month(data) desc limit 6;

-- select para recuperar a media do ultimo mes inserido

select date_format(data, '%M') as mes, round(avg(carga), 1) as media_carga
from registro_exercicio where	nome = 'Supino Reto' and fkTreino = 1
group by date_format(data, '%M'), year(data), month(data)
order by year(data) desc, month(data) desc  limit 1;

select * from registro_exercicio where nome = 'exercicio 1';


select * from treino;
