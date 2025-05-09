var database = require("../database/config")

async function cadastrar(nomeExercicio, idUsuario) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nomeExercicio,);

    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.

    var pegarTreino = `
        select * from treino where fkUsuario = '${idUsuario}' order by idTreino desc limit 1;
    `;
    try{
        var ultimoTreino = await database.executar(pegarTreino);

        console.log("Executando a instrução SQL: \n" + pegarTreino)
        console.log(ultimoTreino)

        var idUltimoTreino = ultimoTreino[0].idTreino;

        var instrucaoSql = `
                    INSERT INTO exercicio (nome, fkTreino) VALUES ('${nomeExercicio}', '${idUltimoTreino}');
                `;
        console.log("Executando a instrução SQL: \n" + instrucaoSql);
        return database.executar(instrucaoSql);
    }
    catch(erro){
        throw erro;
    }

}

module.exports = {
    cadastrar
};