var database = require("../database/config")

async function cadastrar(nomeExercicio, idUsuario) {

    var pegarTreino = `
        select * from treino where fkUsuario = '${idUsuario}' order by idTreino desc limit 1;
    `;
    try {
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
    catch (erro) {
        return database.executar(instrucaoSql);
    }

}

module.exports = {
    cadastrar
};