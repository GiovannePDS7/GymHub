var database = require("../database/config")

async function cadastrar(nomeTreino, idUsuario) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nomeTreino, idUsuario);

    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.

    var verificarTreino = `
        select nome from treino where nome = '${nomeTreino}' and fkUsuario = '${idUsuario}';
    `

    try {
        var treinoCadastrado = await database.executar(verificarTreino);

        console.log("Executando a instrução SQL: \n" + verificarTreino);

        console.log(treinoCadastrado)


        if (treinoCadastrado.length > 0) {
            throw new Error("Já existe um treino com esse nome") // Aqui eu retorno uma mensagem de erro que será tratada na minha controller
        } else {
            var instrucaoSql = `
                INSERT INTO treino (nome, fkUsuario) VALUES ('${nomeTreino}', '${idUsuario}');
            `;
            console.log("Executando a instrução SQL: \n" + instrucaoSql);
            return database.executar(instrucaoSql);
        }
    } catch (erro) {
        throw erro;

    }
}

module.exports = {
    cadastrar
};