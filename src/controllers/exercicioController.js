var exercicioModel = require("../models/exercicioModel");

function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var nomeExercicio = req.body.nomeExercicioServer;
    var idUsuario = req.body.idUsuarioServer;

    // Faça as validações dos valores
    if (nomeExercicio == undefined) {
        res.status(400).send("Nome do exercicio está undefined!");
    } else if (idUsuario == undefined) {
        res.status(400).send("Seu identificador está undefined!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        exercicioModel.cadastrar(nomeExercicio, idUsuario)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(
                        "\nHouve um erro ao criar o exercicio! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage); // Retorna um erro interno '500' e a msg do sql
                }
            );
    }
}

module.exports = {
    cadastrar
}
