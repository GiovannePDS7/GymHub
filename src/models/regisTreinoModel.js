var database = require("../database/config")

function pegarTreino(idUsuario) {

    var pegarTreino = `
        select * from treino where fkUsuario = '${idUsuario}' order by idTreino desc;
    `;
    try {

        console.log("Executando a instrução SQL: \n" + pegarTreino);
        return database.executar(pegarTreino);
    }
    catch (erro) {
        throw erro;
    }

}


function registrarTreino(idTreino, idUsuario) {
    var instrucaoSql = `
                INSERT INTO registro_treino (fkTreino, fkUsuario, data) VALUES ('${idTreino}', '${idUsuario}', NOW());
            `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    pegarTreino,
    registrarTreino
};