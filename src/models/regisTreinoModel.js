var database = require("../database/config")

async function pegarTreino(idUsuario) {

    var pegarTreino = `
        select * from treino where fkUsuario = '${idUsuario}' order by idTreino desc;
    `;
    try{

        console.log("Executando a instrução SQL: \n" + pegarTreino);
        return database.executar(pegarTreino);
    }
    catch(erro){
        throw erro;
    }

}

module.exports = {
    pegarTreino
};