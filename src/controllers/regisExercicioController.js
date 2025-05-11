var regisExercicioModel = require("../models/regisExercicioModel");

function pegarExercicio(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var idTreino = req.body.idTreinoServer;

    if (idTreino == undefined) {
        res.status(400).send("Seu identificador está undefined!");
    } else {

        regisExercicioModel.pegarExercicio(idTreino)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(
                        "\nHouve um erro ao recuperar os exercicios! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage); // Retorna um erro interno '500' e a msg do sql
                }
            );
    }
}


function registrarExercicio(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var idUsuario = req.body.idUsuarioServer;
    var nome = req.body.nomeTreinoServer;
    var carga = req.body.cargaServer;
    var serie = req.body.serieServer;
    var repeticoes = req.body.repeticoesServer;

    // Faça as validações dos valores
    if (idUsuario == undefined) {
        res.status(400).send("O identificador de usuário está undefined!");
    } else if (nome == undefined) {
        res.status(400).send("O nome do exercicio está undefined!");
    } else if (carga == undefined) {
        res.status(400).send("A carga do exercicio está undefined!");
    }
    else if (serie == undefined) {
        res.status(400).send("A serie do exercicio está undefined!");
    }
    else if (repeticoes == undefined) {
        res.status(400).send("As repeticoes do exercicio está undefined!");
    } else {

        regisExercicioModel.registrarExercicio(idUsuario, nome, carga, serie, repeticoes)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(
                        "\nHouve um erro ao registrar o Exercicio! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage); // Retorna um erro interno '500' e a msg do sql
                }
            );
    }
}

module.exports = {
    pegarExercicio,
    registrarExercicio
}
