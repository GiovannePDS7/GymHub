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
    carga decimal(4, 2) not null,
    repeticoes int not null
);

select * from treino;

