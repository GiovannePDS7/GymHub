var database = require("../database/config")

async function pegarExercicio(idTreino) {

    var pegarExercicios = `
       select * from exercicio where fkTreino = '${idTreino}';
    `;
    try {

        console.log("Executando a instrução SQL: \n" + pegarExercicios);
        return database.executar(pegarExercicios);
    }
    catch (erro) {
        throw erro;
    }

}

async function registrarExercicio(idUsuario, nomeTreino, carga, series, repeticoes) {

    var pegarPkComposta = `
       select idRegisTreino, fkTreino from registro_treino where fkUsuario = ${idUsuario} order by idRegisTreino desc limit 1; 
    `
    try {
        var PkComposta = await database.executar(pegarPkComposta);

        console.log("Executando a instrução SQL: \n" + pegarPkComposta);

        console.log(PkComposta)

        idRegisTreino = PkComposta[0].idRegisTreino;
        fkTreino = PkComposta[0].fkTreino;

        var instrucaoSql = `
        INSERT INTO registro_exercicio (fkRegisTreino, fkTreino, nome, carga, series, repeticoes) VALUES ('${idRegisTreino}', '${fkTreino}', '${nomeTreino}','${carga}','${series}','${repeticoes}');
    `;
        console.log("Executando a instrução SQL: \n" + instrucaoSql);
        return database.executar(instrucaoSql);

    } catch (erro) {
        throw erro;
    }

}


module.exports = {
    pegarExercicio,
    registrarExercicio
};