var regisTreinoModel = require("../models/regisTreinoModel");

function pegarTreino(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
   
    var idUsuario = req.body.idUsuarioServer;

    if (idUsuario == undefined) {
        res.status(400).send("Seu identificador está undefined!");
    } else {

        regisTreinoModel.pegarTreino(idUsuario)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(
                        "\nHouve um erro ao recuperar os treinos! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage); // Retorna um erro interno '500' e a msg do sql
                }
            );
    }
}

module.exports = {
    pegarTreino
}
