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


function registrarTreino(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var idTreino = req.body.idTreinoServer;
    var idUsuario = req.body.idUsuarioServer;

    console.log('treino fk na controller: ' + idTreino)
    console.log('idUsuario na controller: ' + idUsuario)


    // Faça as validações dos valores
    if (idTreino == undefined) {
        res.status(400).send("O identificador do treino está undefined!");
    } else if (idUsuario == undefined) {
        res.status(400).send("Seu identificador está undefined!");
    } else {

        regisTreinoModel.registrarTreino(idTreino, idUsuario)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(
                        "\nHouve um erro ao registrar o Treino! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage); // Retorna um erro interno '500' e a msg do sql
                }
            );
    }
}



module.exports = {
    pegarTreino,
    registrarTreino
}
