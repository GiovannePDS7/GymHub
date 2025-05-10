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

module.exports = {
    pegarExercicio
}
