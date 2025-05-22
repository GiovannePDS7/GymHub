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

select * from treino;
select * from exercicio;
select * from usuario;
select * from registro_treino;
select * from registro_exercicio;

SET lc_time_names = 'pt_BR'; -- aqui eu coloco a configração para pt-br para retornar os meses em portugues

-- select que retorna a média das cargas dos ultimox X meses de um exercício específico

select date_format(data, '%M') as mes, round(avg(carga), 1) as media_carga
from registro_exercicio
where nome = 'Supino Reto' and data between date_format(curdate() - interval '2' month,  '%Y-%m-01') and now() and fkTreino = '1'
group by date_format(data, '%M'), year(data), month(data)
order by year(data) desc, month(data) desc limit 3;

-- select para recuperar a media do ultimo mes inserido

select date_format(data, '%M') as mes, round(avg(carga), 1) as media_carga
from registro_exercicio where	nome = 'Supino Reto' and fkTreino = 1
group by date_format(data, '%M'), year(data), month(data)
order by year(data) desc, month(data) desc  limit 1;

select * from registro_exercicio where nome = 'exercicio 1';


select * from treino;

describe registro_treino;

select count(idRegisTreino) as CheckIn from registro_treino where data between date_format(curdate() - interval '2' month, '%Y-%m-01') and now() 
and fkUsuario = 1;

select T.nome as Treino, count(RT.idRegisTreino) as 'Frequência' from registro_treino RT join treino T on RT.fkTreino = T.idTreino where RT.data
between date_format(curdate() - interval '2' month, '%Y-%m-01') and now() group by T.nome order by count(RT.idRegisTreino) desc limit 1;

select * from treino;



-- INSERTS AQUI

insert into usuario(nome, email, senha) values ('Giovanne', 'giovanne3282@gmail.com', '3282');


insert into treino (nome, fkUsuario) values ('Peito e Tríceps', 1);
insert into treino (nome, fkUsuario) values ('Costas e Bíceps', 1);

insert into exercicio (nome, fkTreino) values ('Supino Reto', 1);
insert into exercicio (nome, fkTreino) values ('Crucifixo Inclinado', 1);
insert into exercicio (nome, fkTreino) values ('Tríceps Corda', 1);

insert into exercicio (nome, fkTreino) values ('Puxada Alta', 2);
insert into exercicio (nome, fkTreino) values ('Remada Unilateral', 2);
insert into exercicio (nome, fkTreino) values ('Rosca Direta', 2);

-- registros de treino e exercicio para demonstração

-- mes de abril 2024
insert into registro_treino(fkTreino, fkUsuario, data) values(1, 1, '2024-04-01');
insert into registro_exercicio(fkRegisTreino, fkTreino, nome, carga, series, repeticoes, data) 
values(1, 1,'Supino Reto', 10.00, 3, 12, '2024-04-01 16:00:00');
insert into registro_exercicio(fkRegisTreino, fkTreino, nome, carga, series, repeticoes, data) 
values(1, 1,'Crucifixo Inclinado', 12.00, 3, 12, '2024-04-01 16:00:00');
insert into registro_exercicio(fkRegisTreino, fkTreino, nome, carga, series, repeticoes, data) 
values(1, 1,'Tríceps Corda', 12.00, 3, 12, '2024-04-01 16:00:00');

-- mes de maio 2024
insert into registro_treino(fkTreino, fkUsuario, data) values(1, 1, '2024-05-01');
insert into registro_exercicio(fkRegisTreino, fkTreino, nome, carga, series, repeticoes, data) 
values(2, 1,'Supino Reto', 12.00, 3, 12, '2024-05-01 16:00:00');
insert into registro_exercicio(fkRegisTreino, fkTreino, nome, carga, series, repeticoes, data) 
values(2, 1,'Crucifixo Inclinado', 14.00, 3, 12, '2024-05-01 16:00:00');
insert into registro_exercicio(fkRegisTreino, fkTreino, nome, carga, series, repeticoes, data) 
values(2, 1,'Tríceps Corda', 14.00, 3, 12, '2024-05-01 16:00:00');

-- mes de junho 2024
insert into registro_treino(fkTreino, fkUsuario, data) values(1, 1, '2024-06-01');
insert into registro_exercicio(fkRegisTreino, fkTreino, nome, carga, series, repeticoes, data) 
values(3, 1,'Supino Reto', 12.00, 3, 12, '2024-06-01 16:00:00');
insert into registro_exercicio(fkRegisTreino, fkTreino, nome, carga, series, repeticoes, data) 
values(3, 1,'Crucifixo Inclinado', 12.00, 3, 12, '2024-06-01 16:00:00');
insert into registro_exercicio(fkRegisTreino, fkTreino, nome, carga, series, repeticoes, data) 
values(3, 1,'Tríceps Corda', 16.00, 3, 12, '2024-06-01 16:00:00');

-- mes de julho 2024
insert into registro_treino(fkTreino, fkUsuario, data) values(1, 1, '2024-07-01');
insert into registro_exercicio(fkRegisTreino, fkTreino, nome, carga, series, repeticoes, data) 
values(4, 1,'Supino Reto', 15.00, 3, 12, '2024-07-01 16:00:00');
insert into registro_exercicio(fkRegisTreino, fkTreino, nome, carga, series, repeticoes, data) 
values(4, 1,'Crucifixo Inclinado', 16.00, 3, 12, '2024-07-01 16:00:00');
insert into registro_exercicio(fkRegisTreino, fkTreino, nome, carga, series, repeticoes, data) 
values(4, 1,'Tríceps Corda', 18.00, 3, 12, '2024-07-01 16:00:00');

-- mes de agosto 2024
insert into registro_treino(fkTreino, fkUsuario, data) values(1, 1, '2024-08-01');
insert into registro_exercicio(fkRegisTreino, fkTreino, nome, carga, series, repeticoes, data) 
values(5, 1,'Supino Reto', 18.00, 3, 12, '2024-08-01 16:00:00');
insert into registro_exercicio(fkRegisTreino, fkTreino, nome, carga, series, repeticoes, data) 
values(5, 1,'Crucifixo Inclinado', 18.00, 3, 12, '2024-08-01 16:00:00');
insert into registro_exercicio(fkRegisTreino, fkTreino, nome, carga, series, repeticoes, data) 
values(5, 1,'Tríceps Corda', 20.00, 3, 12, '2024-08-01 16:00:00');

-- mes de setembro 2024
insert into registro_treino(fkTreino, fkUsuario, data) values(1, 1, '2024-09-01');
insert into registro_exercicio(fkRegisTreino, fkTreino, nome, carga, series, repeticoes, data) 
values(6, 1,'Supino Reto', 18.00, 3, 12, '2024-09-01 16:00:00');
insert into registro_exercicio(fkRegisTreino, fkTreino, nome, carga, series, repeticoes, data) 
values(6, 1,'Crucifixo Inclinado', 18.00, 3, 12, '2024-09-01 16:00:00');
insert into registro_exercicio(fkRegisTreino, fkTreino, nome, carga, series, repeticoes, data) 
values(6, 1,'Tríceps Corda', 20.00, 3, 12, '2024-09-01 16:00:00');

-- mes de outubro 2024
insert into registro_treino(fkTreino, fkUsuario, data) values(1, 1, '2024-10-01');
insert into registro_exercicio(fkRegisTreino, fkTreino, nome, carga, series, repeticoes, data) 
values(7, 1,'Supino Reto', 20.00, 3, 12, '2024-10-01 16:00:00');
insert into registro_exercicio(fkRegisTreino, fkTreino, nome, carga, series, repeticoes, data) 
values(7, 1,'Crucifixo Inclinado', 20.00, 3, 12, '2024-10-01 16:00:00');
insert into registro_exercicio(fkRegisTreino, fkTreino, nome, carga, series, repeticoes, data) 
values(7, 1,'Tríceps Corda', 22.00, 3, 12, '2024-10-01 16:00:00');

-- mes de novembro 2024
insert into registro_treino(fkTreino, fkUsuario, data) values(1, 1, '2024-11-01');
insert into registro_exercicio(fkRegisTreino, fkTreino, nome, carga, series, repeticoes, data) 
values(8, 1,'Supino Reto', 15.00, 3, 12, '2024-11-01 16:00:00');
insert into registro_exercicio(fkRegisTreino, fkTreino, nome, carga, series, repeticoes, data) 
values(8, 1,'Crucifixo Inclinado', 22.00, 3, 12, '2024-11-01 16:00:00');
insert into registro_exercicio(fkRegisTreino, fkTreino, nome, carga, series, repeticoes, data) 
values(8, 1,'Tríceps Corda', 22.00, 3, 12, '2024-11-01 16:00:00');

-- mes de desembro 2024
insert into registro_treino(fkTreino, fkUsuario, data) values(1, 1, '2024-12-01');
insert into registro_exercicio(fkRegisTreino, fkTreino, nome, carga, series, repeticoes, data) 
values(9, 1,'Supino Reto', 22.00, 3, 12, '2024-12-01 16:00:00');
insert into registro_exercicio(fkRegisTreino, fkTreino, nome, carga, series, repeticoes, data) 
values(9, 1,'Crucifixo Inclinado', 24.00, 3, 12, '2024-12-01 16:00:00');
insert into registro_exercicio(fkRegisTreino, fkTreino, nome, carga, series, repeticoes, data) 
values(9, 1,'Tríceps Corda', 22.00, 3, 12, '2024-12-01 16:00:00');

-- mes de janeiro 2025
insert into registro_treino(fkTreino, fkUsuario, data) values(1, 1, '2025-01-01');
insert into registro_exercicio(fkRegisTreino, fkTreino, nome, carga, series, repeticoes, data) 
values(10, 1,'Supino Reto', 24.00, 3, 12, '2025-01-01 16:00:00');
insert into registro_exercicio(fkRegisTreino, fkTreino, nome, carga, series, repeticoes, data) 
values(10, 1,'Crucifixo Inclinado', 26.00, 3, 12, '2025-01-01 16:00:00');
insert into registro_exercicio(fkRegisTreino, fkTreino, nome, carga, series, repeticoes, data) 
values(10, 1,'Tríceps Corda', 24.00, 3, 12, '2025-01-01 16:00:00');

-- mes de fevereiro 2025
insert into registro_treino(fkTreino, fkUsuario, data) values(1, 1, '2025-02-01');
insert into registro_exercicio(fkRegisTreino, fkTreino, nome, carga, series, repeticoes, data) 
values(11, 1,'Supino Reto', 26.00, 3, 12, '2025-02-01 16:00:00');
insert into registro_exercicio(fkRegisTreino, fkTreino, nome, carga, series, repeticoes, data) 
values(11, 1,'Crucifixo Inclinado', 26.00, 3, 12, '2025-02-01 16:00:00');
insert into registro_exercicio(fkRegisTreino, fkTreino, nome, carga, series, repeticoes, data) 
values(11, 1,'Tríceps Corda', 25.00, 3, 12, '2025-02-01 16:00:00');

-- mes de março 2025
insert into registro_treino(fkTreino, fkUsuario, data) values(1, 1, '2025-03-01');
insert into registro_exercicio(fkRegisTreino, fkTreino, nome, carga, series, repeticoes, data) 
values(12, 1,'Supino Reto', 28.00, 3, 12, '2025-03-01 16:00:00');
insert into registro_exercicio(fkRegisTreino, fkTreino, nome, carga, series, repeticoes, data) 
values(12, 1,'Crucifixo Inclinado', 26.00, 3, 12, '2025-03-01 16:00:00');
insert into registro_exercicio(fkRegisTreino, fkTreino, nome, carga, series, repeticoes, data) 
values(12, 1,'Tríceps Corda', 26.00, 3, 12, '2025-03-01 16:00:00');

-- mes de abril 2025
insert into registro_treino(fkTreino, fkUsuario, data) values(1, 1, '2025-04-01');
insert into registro_exercicio(fkRegisTreino, fkTreino, nome, carga, series, repeticoes, data) 
values(13, 1,'Supino Reto', 30.00, 3, 12, '2025-04-01 16:00:00');
insert into registro_exercicio(fkRegisTreino, fkTreino, nome, carga, series, repeticoes, data) 
values(13, 1,'Crucifixo Inclinado', 26.00, 3, 12, '2025-04-01 16:00:00');
insert into registro_exercicio(fkRegisTreino, fkTreino, nome, carga, series, repeticoes, data) 
values(13, 1,'Tríceps Corda', 26.00, 3, 12, '2025-04-01 16:00:00');

-- mes de maio 2025
insert into registro_treino(fkTreino, fkUsuario, data) values(1, 1, '2025-05-01');
insert into registro_exercicio(fkRegisTreino, fkTreino, nome, carga, series, repeticoes, data) 
values(14, 1,'Supino Reto', 32.00, 3, 12, '2025-05-01 16:00:00');
insert into registro_exercicio(fkRegisTreino, fkTreino, nome, carga, series, repeticoes, data) 
values(14, 1,'Crucifixo Inclinado', 30.00, 3, 12, '2025-05-01 16:00:00');
insert into registro_exercicio(fkRegisTreino, fkTreino, nome, carga, series, repeticoes, data) 
values(14, 1,'Tríceps Corda', 28.00, 3, 12, '2025-05-01 16:00:00');


insert into registro_treino(fkTreino, fkUsuario, data) values(2, 1, '2025-04-01');
