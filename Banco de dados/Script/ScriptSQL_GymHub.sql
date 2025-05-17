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

select * from exercicio where fkTreino = 2;

select * from registro_treino;

select idRegisTreino, fkTreino from registro_treino where fkUsuario = 1 order by idRegisTreino desc limit 1;

select * from registro_exercicio;

select * from exercicio where fkTreino = '3';


insert into registro_treino(fkTreino, fkUsuario, data)
values
(1, 1, CURDATE() - INTERVAL 1 MONTH), 
(2, 1, CURDATE() - INTERVAL 2 MONTH), 
(1, 1, CURDATE() - INTERVAL 3 MONTH),  
(2, 1, CURDATE() - INTERVAL 4 MONTH);

insert into registro_exercicio(fkRegisTreino, fkTreino, nome, carga, series, repeticoes)
values
(1, 1, 'Supino Reto', 80.00, 4, 12),
(1, 1, 'Crucifixo Inclinado', 25.00, 4, 12),
(1, 1, 'Tríceps Corda', 30.00, 4, 12),
(2, 2, 'Puxada Alta', 60.00, 4, 12),
(2, 2, 'Remada Unilateral', 40.00, 4, 12),
(2, 2, 'Rosca Direta', 20.00, 4, 12),
(3, 1, 'Supino Reto', 85.00, 4, 10),
(3, 1, 'Crucifixo Inclinado', 27.50, 4, 10),
(3, 1, 'Tríceps Corda', 32.50, 4, 10);

select * from registro_treino
where data >= CURDATE() - INTERVAL 2 MONTH;

SET lc_time_names = 'pt_BR'; -- Aqui eu coloco a configração para pt-br para retornar os meses em portugues

-- Select que retorna a média das cargas dos ultimox X meses de um exercício específico
select
    date_format(data, '%M') as mes,
    round(avg(carga), 1) as media_carga
from
    registro_exercicio
where
    nome = 'Supino Reto'
    and data between date_format(curdate() - interval '2' month,  '%Y-%m-01')
                and curdate()
    and fkTreino = '1'
group by
     date_format(data, '%M'), year(data), month(data)
order by
    year(data), month(data) desc
limit 3;

-- select para recuperar a media do ultimo mes inserido

select
    date_format(data, '%M') as mes,
    round(avg(carga), 1) as media_carga
from
    registro_exercicio
where
    nome = 'Supino Reto'
    and fkTreino = 1
group by
     date_format(data, '%M'), year(data), month(data)
order by
    year(data), month(data) desc
limit 1;

-- Janeiro
INSERT INTO registro_exercicio (fkRegisTreino, fkTreino, nome, carga, series, repeticoes, data)
VALUES 
(1, 1, 'Supino Reto', 74.0, 4, 10, '2025-01-10'),
(1, 1, 'Supino Reto', 76.0, 4, 10, '2025-01-15');

-- Fevereiro
INSERT INTO registro_exercicio (fkRegisTreino, fkTreino, nome, carga, series, repeticoes, data)
VALUES 
(2, 1, 'Supino Reto', 77.0, 4, 10, '2025-02-10'),
(2, 1, 'Supino Reto', 78.0, 4, 10, '2025-02-17');

-- Março
INSERT INTO registro_exercicio (fkRegisTreino, fkTreino, nome, carga, series, repeticoes, data)
VALUES 
(3, 1, 'Supino Reto', 80.0, 4, 10, '2025-03-05'),
(3, 1, 'Supino Reto', 80.0, 4, 10, '2025-03-20');

-- Abril
INSERT INTO registro_exercicio (fkRegisTreino, fkTreino, nome, carga, series, repeticoes, data)
VALUES 
(4, 1, 'Supino Reto', 82.0, 4, 10, '2025-04-08'),
(4, 1, 'Supino Reto', 83.0, 4, 10, '2025-04-22');

-- Maio
INSERT INTO registro_exercicio (fkRegisTreino, fkTreino, nome, carga, series, repeticoes, data)
VALUES 
(5, 1, 'Supino Reto', 84.0, 4, 10, '2025-05-05'),
(5, 1, 'Supino Reto', 86.0, 4, 10, '2025-05-19');

-- Junho
INSERT INTO registro_exercicio (fkRegisTreino, fkTreino, nome, carga, series, repeticoes, data)
VALUES 
(6, 1, 'Supino Reto', 87.0, 4, 10, '2025-06-01'),
(6, 1, 'Supino Reto', 88.0, 4, 10, '2025-06-10');

delete from registro_exercicio where idRegisExercicio in (30, 31);

select * from registro_exercicio;
