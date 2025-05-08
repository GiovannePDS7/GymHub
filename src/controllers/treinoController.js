var treinoModel = require("../models/treinoModel.js");

function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var nomeTreino = req.body.nomeTreinoServer;
    var idUsuario = req.body.idUsuarioServer;


    // Faça as validações dos valores
    if (nomeTreino == undefined) {
        res.status(400).send("Nome do treino está undefined!");
    } else if (idUsuario == undefined) {
        res.status(400).send("Seu identificador está undefined!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        treinoModel.cadastrar(nomeTreino, idUsuario)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log('Erro vindo da minha model: ' + erro);

                    if (erro.message == "Já existe um treino com esse nome") { // Aqui eu vejo se a mensagem de erro é a mesma definida para email ja cadastrado
                        res.status(400).json({ erroTreino: erro.message }) // Retorna uma res. com Bad Request enviando um JSON com atributo do erro
                    } else {
                        console.log(
                            "\nHouve um erro ao realizar o cadastro! Erro: ",
                            erro.sqlMessage
                        );
                        res.status(500).json(erro.sqlMessage); // Retorna um erro interno '500' e a msg do sql
                    }
                }
            );
    }
}

module.exports = {
    cadastrar
}
